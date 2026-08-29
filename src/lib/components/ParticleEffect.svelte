<script lang="ts">
  import { onMount } from "svelte";

  export let background = "#04050a";
  export let density = 300;
  export let dotSize = 120;
  export let speed = 6;
  export let cameraDistance = 200;
  export let colors: string[] | ColorsGroup = ["#FFFFFF", "#FFFFFF"];
  export let ringSettings: RingSettings = {
    push: 50,
    width: 9,
    radius: 12,
    turbulence: 100,
  };

  type GL = WebGLRenderingContext | WebGL2RenderingContext;
  type GLFormat = { internal: number; format: number; type: number };
  type ProgramInfo = {
    prog: WebGLProgram;
    u: Record<string, WebGLUniformLocation | null>;
  };
  type RenderTarget = { tex: WebGLTexture; fbo: WebGLFramebuffer };
  type ColorsGroup = {
    items?: string[];
    points?: string[];
    color1?: string;
    color2?: string;
    color3?: string;
  };
  type RingSettings = {
    push?: number;
    width?: number;
    radius?: number;
    turbulence?: number;
  };
  type LiveSettings = {
    colors: Float32Array;
    colorCount: number;
    dotSize: number;
    speed: number;
    camDist: number;
    ringRadius: number;
    ringWidth: number;
    ringEdge: number;
    push: number;
    turb: number;
  };

  let canvas: HTMLCanvasElement;
  let host: HTMLDivElement;

  const FIELD = 500;
  const HALF = FIELD / 2;
  const WORLD = 5;
  const CURSOR_REACH = 0.175;
  const CURSOR_LERP = 0.12;
  const WANDER_LERP = 0.01;
  const HANDOVER_LERP = 0.08;
  const CURSOR_JITTER = 0.01;
  const FOV = 40;
  const DPR_CAP = 2;
  const MAX_POINTS = 65536;
  const MAX_COLORS = 5;
  const RING_EDGE = 4;
  const TAU = Math.PI * 2;
  const DEFAULT_COLORS = ["#7189ff", "#3074f9", "#0b0b18"];

  const NOISE = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
    + i.y+vec4(0.0,i1.y,i2.y,1.0))
    + i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

  const FIELD_TERMS = `
void fieldTerms(
    vec2 ref, vec2 ringPos, float time,
    float ringRadius, float w1, float w2, float turb,
    out vec2 disp, out float bandT, out float bandHot
){
    float dist = distance(ref, ringPos);
    float n0 = snoise(vec3(ref * 0.2 + vec2(18.4924, 72.9744), time * 0.5));
    float dist1 = distance(ref + (n0 * 0.005), ringPos);
    float t  = smoothstep(ringRadius - (w1 * 2.0), ringRadius, dist)
             - smoothstep(ringRadius, ringRadius + w1, dist1);
    float t2 = smoothstep(ringRadius - (w2 * 2.0), ringRadius, dist)
             - smoothstep(ringRadius, ringRadius + w2, dist1);
    float t3 = smoothstep(ringRadius + w2, ringRadius, dist);
    t = pow(max(t, 0.0), 2.0);
    t2 = pow(max(t2, 0.0), 3.0);
    t += t2 * 3.0;
    t += t3 * 0.4;
    t += snoise(vec3(ref * 30.0 + vec2(11.4924, 12.9744), time * 0.5)) * t3 * 0.5;
    float nS = snoise(vec3(ref * 2.0 + vec2(18.4924, 72.9744), time * 0.5));
    t += pow((nS + 1.5) * 0.5, 2.0) * 0.6;
    float n1 = snoise(vec3(ref * 4.0 + vec2(88.494, 32.4397), time * 0.35));
    float n2 = snoise(vec3(ref * 4.0 + vec2(50.904, 120.947), time * 0.35));
    float n3 = snoise(vec3(ref * 20.0 + vec2(18.4924, 72.9744), time * 0.5));
    float n4 = snoise(vec3(ref * 20.0 + vec2(50.904, 120.947), time * 0.5));
    vec2 d = vec2(n1, n2) * 0.03 + vec2(n3, n4) * 0.005;
    d.x += sin((ref.x * 20.0) + (time * 4.0)) * 0.02 * clamp(dist, 0.0, 1.0);
    d.y += cos((ref.y * 20.0) + (time * 3.0)) * 0.02 * clamp(dist, 0.0, 1.0);
    disp = d * turb;
    bandT = t;
    bandHot = t2;
}`;

  const SIM_VERT = `
precision highp float;
attribute vec2 aPos;
varying vec2 vUV;
void main(){
  vUV = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

  const SIM_FRAG = `
precision highp float;
uniform sampler2D uState;
uniform sampler2D uRefs;
uniform vec2 uRingPos;
uniform float uRingRadius;
uniform float uRingWidth;
uniform float uRingWidth2;
uniform float uPush;
uniform float uTurb;
uniform float uTime;
varying vec2 vUV;
${NOISE}
${FIELD_TERMS}
void main(){
  vec4 frame = texture2D(uState, vUV);
  vec2 ref = texture2D(uRefs, vUV).xy;
  float scale = frame.z;
  float energy = frame.w;
  vec2 disp; float t; float t2;
  fieldTerms(ref, uRingPos, uTime * 0.5, uRingRadius, uRingWidth, uRingWidth2, uTurb, disp, t, t2);
  vec2 mem = frame.xy * 0.8;
  mem -= (uRingPos - (ref + disp)) * pow(max(t2, 0.0), 0.75) * uPush;
  scale += (t - scale) * 0.2;
  vec2 finalPos = ref + disp + (mem * 0.25);
  energy = energy * 0.5 + scale * 0.25;
  gl_FragColor = vec4(finalPos, scale, energy);
}`;

  const RENDER_VERT = (isStatic: boolean) => `
precision highp float;
attribute vec2 aUV;
attribute vec2 aRef;
uniform sampler2D uState;
uniform float uProjF;
uniform float uAspect;
uniform float uCamDist;
uniform float uPointScale;
${
  isStatic
    ? `uniform vec2 uRingPos;
uniform float uRingRadius;
uniform float uRingWidth;
uniform float uRingWidth2;
uniform float uTurb;
uniform float uTime;`
    : ""
}
varying vec2 vLocalPos;
varying float vScale;
varying float vEnergy;
${isStatic ? NOISE : ""}
${isStatic ? FIELD_TERMS : ""}
void main(){
${
  isStatic
    ? `  vec2 disp; float t; float t2;
  fieldTerms(aRef, uRingPos, uTime * 0.5, uRingRadius, uRingWidth, uRingWidth2, uTurb, disp, t, t2);
  vec4 state = vec4(aRef + disp, t, t * 0.5);`
    : "  vec4 state = texture2D(uState, aUV);"
}
  vLocalPos = state.xy;
  vScale = state.z;
  vEnergy = state.w;
  vec2 world = state.xy * ${WORLD.toFixed(1)};
  gl_Position = vec4(world.x * uProjF / uAspect, world.y * uProjF, 0.0, uCamDist);
  gl_PointSize = max(vScale, 0.0) * 7.0 * uPointScale;
}`;

  const RENDER_FRAG = `
precision highp float;
varying vec2 vLocalPos;
varying float vScale;
varying float vEnergy;
uniform vec3 uColors[${MAX_COLORS}];
uniform int uColorCount;
uniform vec2 uRingPos;
uniform float uTime;
${NOISE}
float sdRoundBox(in vec2 p, in vec2 b, in float r){
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}
vec2 rotate(vec2 v, float a){
  float s = sin(a);
  float c = cos(a);
  return mat2(c, s, -s, c) * v;
}
void main(){
  float noiseAngle = snoise(vec3(vLocalPos * 10.0 + vec2(18.4924, 72.9744), uTime * 0.85));
  float noiseColor = snoise(vec3(vLocalPos * 2.0 + vec2(74.664, 91.556), uTime * 0.5));
  noiseColor = (noiseColor + 1.0) * 0.5;
  float angle = atan(vLocalPos.y - uRingPos.y, vLocalPos.x - uRingPos.x);
  vec2 uv = gl_PointCoord.xy - vec2(0.5);
  uv.y *= -1.0;
  uv = rotate(uv, -angle + (noiseAngle * 0.5));
  float p = smoothstep(0.0, 0.75, pow(noiseColor, 2.0));
  vec3 color = uColors[0];
  for (int i = 0; i < ${MAX_COLORS - 1}; i++) {
    if (i < uColorCount - 1) {
      float span = 1.0 / float(uColorCount - 1);
      float t = clamp((p - float(i) * span) / span, 0.0, 1.0);
      color = mix(color, uColors[i + 1], t);
    }
  }
  float d = sdRoundBox(uv, vec2(0.5, 0.2), 0.25);
  float mask = smoothstep(0.1, 0.0, d);
  float a = mask * smoothstep(0.1, 0.2, vScale);
  if (a < 0.01) discard;
  color = clamp(color, 0.0, 1.0) * clamp(vEnergy, 0.0, 1.0);
  gl_FragColor = vec4(color, clamp(a, 0.0, 1.0));
}`;

  function compile(gl: GL, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("shader creation failed");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(log || "shader compile failed");
    }
    return shader;
  }

  function createProgram(
    gl: GL,
    vs: string,
    fs: string,
    names: string[],
  ): ProgramInfo {
    const prog = gl.createProgram();
    if (!prog) throw new Error("program creation failed");
    const vertex = compile(gl, gl.VERTEX_SHADER, vs);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, fs);
    gl.attachShader(prog, vertex);
    gl.attachShader(prog, fragment);
    gl.linkProgram(prog);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(prog);
      gl.deleteProgram(prog);
      throw new Error(log || "program link failed");
    }
    const u: Record<string, WebGLUniformLocation | null> = {};
    for (const name of names) u[name] = gl.getUniformLocation(prog, name);
    return { prog, u };
  }

  function makeContext(element: HTMLCanvasElement) {
    const options: WebGLContextAttributes = {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    };
    let gl = element.getContext("webgl2", options) as GL | null;
    let format: GLFormat | null = null;
    if (gl) {
      const gl2 = gl as WebGL2RenderingContext;
      format = gl.getExtension("EXT_color_buffer_float")
        ? { internal: gl2.RGBA32F, format: gl.RGBA, type: gl.FLOAT }
        : { internal: gl2.RGBA16F, format: gl.RGBA, type: gl2.HALF_FLOAT };
    } else {
      gl = (element.getContext("webgl", options) ||
        element.getContext("experimental-webgl", options)) as GL | null;
      if (!gl) return null;
      format =
        gl.getExtension("OES_texture_float") &&
        gl.getExtension("WEBGL_color_buffer_float")
          ? { internal: gl.RGBA, format: gl.RGBA, type: gl.FLOAT }
          : null;
    }
    if (gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) < 2) format = null;
    return { gl, format };
  }

  function stateTexture(
    gl: GL,
    format: GLFormat,
    size: number,
    pixels: Float32Array | null,
  ) {
    const texture = gl.createTexture();
    if (!texture) throw new Error("texture creation failed");
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      format.internal,
      size,
      size,
      0,
      format.format,
      format.type,
      pixels,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
  }

  function renderTarget(gl: GL, format: GLFormat, size: number): RenderTarget {
    const tex = stateTexture(gl, format, size, null);
    const fbo = gl.createFramebuffer();
    if (!fbo) throw new Error("framebuffer creation failed");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      tex,
      0,
    );
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error("float framebuffer is incomplete");
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { tex, fbo };
  }

  function mulberry32(seed: number) {
    return () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function poissonDisk(
    size: number,
    minD: number,
    maxD: number,
    tries: number,
    random: () => number,
  ) {
    const cell = minD / Math.SQRT2;
    const gw = Math.ceil(size / cell);
    const gh = Math.ceil(size / cell);
    const grid = new Int32Array(gw * gh).fill(-1);
    const px: number[] = [];
    const py: number[] = [];
    const active: number[] = [];
    const minD2 = minD * minD;
    const add = (x: number, y: number) => {
      const index = px.length;
      px.push(x);
      py.push(y);
      grid[((y / cell) | 0) * gw + ((x / cell) | 0)] = index;
      active.push(index);
    };
    add(random() * size, random() * size);
    while (active.length > 0 && px.length < MAX_POINTS) {
      const activeIndex = (random() * active.length) | 0;
      const pointIndex = active[activeIndex];
      let placed = false;
      for (let attempt = 0; attempt < tries; attempt += 1) {
        const angle = random() * TAU;
        const radius = minD + (maxD - minD) * random();
        const x = px[pointIndex] + Math.cos(angle) * radius;
        const y = py[pointIndex] + Math.sin(angle) * radius;
        if (x < 0 || y < 0 || x >= size || y >= size) continue;
        const cx = (x / cell) | 0;
        const cy = (y / cell) | 0;
        let valid = true;
        for (
          let row = Math.max(0, cy - 2);
          row <= Math.min(gh - 1, cy + 2) && valid;
          row += 1
        ) {
          for (
            let column = Math.max(0, cx - 2);
            column <= Math.min(gw - 1, cx + 2);
            column += 1
          ) {
            const neighbor = grid[row * gw + column];
            if (neighbor < 0) continue;
            const dx = px[neighbor] - x;
            const dy = py[neighbor] - y;
            if (dx * dx + dy * dy < minD2) {
              valid = false;
              break;
            }
          }
        }
        if (valid) {
          add(x, y);
          placed = true;
          break;
        }
      }
      if (!placed) {
        active[activeIndex] = active[active.length - 1];
        active.pop();
      }
    }
    return { px, py };
  }

  function buildField(value: number) {
    const safeDensity = Math.max(0, Math.min(300, value));
    const map = (x: number, a: number, b: number, c: number, d: number) =>
      ((x - a) * (d - c)) / (b - a) + c;
    const { px, py } = poissonDisk(
      FIELD,
      map(safeDensity, 0, 300, 10, 2),
      map(safeDensity, 0, 300, 11, 3),
      20,
      mulberry32(0x9e3779b9),
    );
    const count = px.length;
    let texSize = 8;
    while (texSize * texSize < count) texSize *= 2;
    const refs = new Float32Array(texSize * texSize * 4);
    const aUV = new Float32Array(count * 2);
    const aRef = new Float32Array(count * 2);
    for (let index = 0; index < count; index += 1) {
      const x = (px[index] - HALF) / HALF;
      const y = (py[index] - HALF) / HALF;
      refs[index * 4] = x;
      refs[index * 4 + 1] = y;
      aRef[index * 2] = x;
      aRef[index * 2 + 1] = y;
      aUV[index * 2] = ((index % texSize) + 0.5) / texSize;
      aUV[index * 2 + 1] = (Math.floor(index / texSize) + 0.5) / texSize;
    }
    return { count, texSize, refs, aUV, aRef };
  }

  function valueNoise1(x: number, seed: number) {
    const integer = Math.floor(x);
    const fraction = x - integer;
    const hash = (n: number) => {
      const value = Math.sin((n + seed) * 127.1) * 43758.5453;
      return value - Math.floor(value);
    };
    const eased = fraction * fraction * (3 - 2 * fraction);
    return hash(integer) * (1 - eased) + hash(integer + 1) * eased;
  }

  function hexToRgb(hex: string): [number, number, number] {
    let value = typeof hex === "string" ? hex.trim() : "";
    const rgb = value.match(/^rgba?\(([^)]+)\)$/i);
    if (rgb) {
      const parts = rgb[1].split(",").map(Number.parseFloat);
      return [
        (parts[0] || 0) / 255,
        (parts[1] || 0) / 255,
        (parts[2] || 0) / 255,
      ];
    }
    value = value.replace("#", "");
    if (value.length === 3)
      value = value
        .split("")
        .map((character) => character + character)
        .join("");
    if (value.length === 8) value = value.slice(0, 6);
    if (value.length !== 6) return [1, 1, 1];
    const number = Number.parseInt(value, 16);
    return Number.isFinite(number)
      ? [
          ((number >> 16) & 255) / 255,
          ((number >> 8) & 255) / 255,
          (number & 255) / 255,
        ]
      : [1, 1, 1];
  }

  function makeLiveSettings(): LiveSettings {
    const group = Array.isArray(colors) ? null : colors;
    const palette =
      [
        group?.items?.filter(Boolean),
        Array.isArray(colors) ? colors.filter(Boolean) : undefined,
        group?.points?.filter(Boolean),
        group?.color1 || group?.color2 || group?.color3
          ? [
              group.color1 ?? DEFAULT_COLORS[0],
              group.color2 ?? DEFAULT_COLORS[1],
              group.color3 ?? DEFAULT_COLORS[2],
            ]
          : undefined,
      ].find((candidate) => candidate && candidate.length > 0) ??
      DEFAULT_COLORS;
    const swatches = palette.slice(0, MAX_COLORS).map(hexToRgb);
    const flatColors = new Float32Array(MAX_COLORS * 3);
    for (let index = 0; index < MAX_COLORS; index += 1) {
      const color = swatches[Math.min(index, swatches.length - 1)];
      flatColors[index * 3] = color[0];
      flatColors[index * 3 + 1] = color[1];
      flatColors[index * 3 + 2] = color[2];
    }
    return {
      colors: flatColors,
      colorCount: swatches.length,
      dotSize: dotSize / 100,
      speed: speed / 50,
      camDist: cameraDistance / 100,
      ringRadius: (ringSettings.radius ?? 12) / 100,
      ringWidth: Math.max(ringSettings.width ?? 9, 1) / 100,
      ringEdge: RING_EDGE / 100,
      push: (ringSettings.push ?? 50) / 100,
      turb: (ringSettings.turbulence ?? 100) / 100,
    };
  }

  let live = makeLiveSettings();
  $: live = makeLiveSettings();

  onMount(() => {
    const context = makeContext(canvas);
    if (!context) return;
    const { gl, format } = context;
    const useSimulation = format !== null;
    let simulationProgram: ProgramInfo | null = null;
    let renderProgram: ProgramInfo;
    try {
      if (useSimulation) {
        simulationProgram = createProgram(gl, SIM_VERT, SIM_FRAG, [
          "uState",
          "uRefs",
          "uRingPos",
          "uRingRadius",
          "uRingWidth",
          "uRingWidth2",
          "uPush",
          "uTurb",
          "uTime",
        ]);
      }
      const names = [
        "uProjF",
        "uAspect",
        "uCamDist",
        "uPointScale",
        "uColors[0]",
        "uColorCount",
        "uRingPos",
        "uTime",
      ];
      if (useSimulation) names.push("uState");
      else names.push("uRingRadius", "uRingWidth", "uRingWidth2", "uTurb");
      renderProgram = createProgram(
        gl,
        RENDER_VERT(!useSimulation),
        RENDER_FRAG,
        names,
      );
    } catch (error) {
      console.warn("ParticleEffect:", (error as Error).message);
      return;
    }

    const quad = gl.createBuffer();
    const uvBuffer = gl.createBuffer();
    const referenceBuffer = gl.createBuffer();
    if (!quad || !uvBuffer || !referenceBuffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    let referencesTexture: WebGLTexture | null = null;
    let targetA: RenderTarget | null = null;
    let targetB: RenderTarget | null = null;
    let count = 0;
    let textureSize = 8;
    let fieldDensity = Number.NaN;

    const disposeField = () => {
      if (referencesTexture) gl.deleteTexture(referencesTexture);
      for (const target of [targetA, targetB]) {
        if (target) {
          gl.deleteTexture(target.tex);
          gl.deleteFramebuffer(target.fbo);
        }
      }
      referencesTexture = null;
      targetA = null;
      targetB = null;
    };

    const rebuildField = (nextDensity: number) => {
      disposeField();
      const field = buildField(nextDensity);
      fieldDensity = nextDensity;
      count = field.count;
      textureSize = field.texSize;
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, field.aUV, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, referenceBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, field.aRef, gl.STATIC_DRAW);
      if (!useSimulation || !format) return;
      referencesTexture = stateTexture(
        gl,
        { internal: format.internal, format: gl.RGBA, type: gl.FLOAT },
        textureSize,
        field.refs,
      );
      targetA = renderTarget(gl, format, textureSize);
      targetB = renderTarget(gl, format, textureSize);
      for (const target of [targetA, targetB]) {
        gl.bindTexture(gl.TEXTURE_2D, target.tex);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          format.internal,
          textureSize,
          textureSize,
          0,
          gl.RGBA,
          gl.FLOAT,
          field.refs,
        );
      }
      gl.bindTexture(gl.TEXTURE_2D, null);
    };

    let dpr = 1;
    let cssWidth = 1;
    let cssHeight = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      cssWidth = Math.max(canvas.clientWidth || host.clientWidth || 1, 1);
      cssHeight = Math.max(canvas.clientHeight || host.clientHeight || 1, 1);
      const width = Math.max(1, Math.round(cssWidth * dpr));
      const height = Math.max(1, Math.round(cssHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const pointer = { x: 0, y: 0, over: false };
    const ringPosition = { x: 0, y: 0 };
    let follow = 0;
    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x =
        ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      pointer.y = -(
        ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 -
        1
      );
      pointer.over =
        pointer.x >= -1 && pointer.x <= 1 && pointer.y >= -1 && pointer.y <= 1;
    };
    window.addEventListener("pointermove", handlePointerMove);

    let animationFrame = 0;
    let lastTime = 0;
    let simulationTime = 0;
    let wanderTime = 0;
    let ping = true;
    const simulationPosition = simulationProgram
      ? gl.getAttribLocation(simulationProgram.prog, "aPos")
      : -1;
    const uvLocation = gl.getAttribLocation(renderProgram.prog, "aUV");
    const referenceLocation = gl.getAttribLocation(renderProgram.prog, "aRef");
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA,
    );

    const draw = (now: number) => {
      animationFrame = requestAnimationFrame(draw);
      const settings = live;
      if (fieldDensity !== density) {
        try {
          rebuildField(density);
        } catch (error) {
          console.warn("ParticleEffect:", (error as Error).message);
          fieldDensity = density;
          return;
        }
      }
      if (!count) return;
      const rawDelta = lastTime ? (now - lastTime) / 1000 : 1 / 60;
      lastTime = now;
      const delta = Math.min(rawDelta, 1 / 20);
      simulationTime = (simulationTime + delta * settings.speed) % 3600;
      wanderTime += delta * settings.speed;
      const aspect = Math.max(cssWidth / Math.max(cssHeight, 1), 0.0001);
      const projection = 1 / Math.tan((FOV * Math.PI) / 180 / 2);
      const noiseX = (valueNoise1(wanderTime * 0.66, 94.234) - 0.5) * 2;
      const noiseY = (valueNoise1(wanderTime * 0.75, 21.028) - 0.5) * 2;
      follow +=
        ((pointer.over ? 1 : 0) - follow) *
        (1 - Math.pow(1 - HANDOVER_LERP, delta * 60));
      const idleX = noiseX * 0.2;
      const idleY = noiseY * 0.1;
      let targetX = idleX;
      let targetY = idleY;
      if (follow > 0.0001) {
        const worldX = (pointer.x * aspect * settings.camDist) / projection;
        const worldY = (pointer.y * settings.camDist) / projection;
        const cursorX = worldX * CURSOR_REACH + noiseX * CURSOR_JITTER;
        const cursorY = worldY * CURSOR_REACH + noiseY * CURSOR_JITTER;
        targetX = idleX + (cursorX - idleX) * follow;
        targetY = idleY + (cursorY - idleY) * follow;
      }
      const lerp = WANDER_LERP + (CURSOR_LERP - WANDER_LERP) * follow;
      const followAmount = 1 - Math.pow(1 - lerp, delta * 60);
      ringPosition.x += (targetX - ringPosition.x) * followAmount;
      ringPosition.y += (targetY - ringPosition.y) * followAmount;
      const radius =
        settings.ringRadius +
        Math.sin(simulationTime) * 0.03 +
        Math.cos(simulationTime * 3) * 0.02;

      if (
        useSimulation &&
        simulationProgram &&
        referencesTexture &&
        targetA &&
        targetB
      ) {
        const source = ping ? targetA : targetB;
        const destination = ping ? targetB : targetA;
        gl.bindFramebuffer(gl.FRAMEBUFFER, destination.fbo);
        gl.viewport(0, 0, textureSize, textureSize);
        gl.disable(gl.BLEND);
        gl.useProgram(simulationProgram.prog);
        gl.bindBuffer(gl.ARRAY_BUFFER, quad);
        gl.enableVertexAttribArray(simulationPosition);
        gl.vertexAttribPointer(simulationPosition, 2, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, source.tex);
        gl.uniform1i(simulationProgram.u.uState, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, referencesTexture);
        gl.uniform1i(simulationProgram.u.uRefs, 1);
        gl.uniform2f(
          simulationProgram.u.uRingPos,
          ringPosition.x,
          ringPosition.y,
        );
        gl.uniform1f(simulationProgram.u.uRingRadius, radius);
        gl.uniform1f(simulationProgram.u.uRingWidth, settings.ringWidth);
        gl.uniform1f(simulationProgram.u.uRingWidth2, settings.ringEdge);
        gl.uniform1f(simulationProgram.u.uPush, settings.push);
        gl.uniform1f(simulationProgram.u.uTurb, settings.turb);
        gl.uniform1f(simulationProgram.u.uTime, simulationTime);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.enable(gl.BLEND);
        ping = !ping;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(renderProgram.prog);
      if (uvLocation >= 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.enableVertexAttribArray(uvLocation);
        gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);
      }
      if (referenceLocation >= 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, referenceBuffer);
        gl.enableVertexAttribArray(referenceLocation);
        gl.vertexAttribPointer(referenceLocation, 2, gl.FLOAT, false, 0, 0);
      }
      if (useSimulation && targetA && targetB) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, (ping ? targetA : targetB).tex);
        gl.uniform1i(renderProgram.u.uState, 0);
      } else {
        gl.uniform1f(renderProgram.u.uRingRadius, radius);
        gl.uniform1f(renderProgram.u.uRingWidth, settings.ringWidth);
        gl.uniform1f(renderProgram.u.uRingWidth2, settings.ringEdge);
        gl.uniform1f(renderProgram.u.uTurb, settings.turb);
      }
      gl.uniform1f(renderProgram.u.uProjF, projection);
      gl.uniform1f(renderProgram.u.uAspect, aspect);
      gl.uniform1f(renderProgram.u.uCamDist, settings.camDist);
      gl.uniform1f(
        renderProgram.u.uPointScale,
        (cssWidth / 2000) * settings.dotSize * dpr * 0.5,
      );
      gl.uniform3fv(renderProgram.u["uColors[0]"], settings.colors);
      gl.uniform1i(renderProgram.u.uColorCount, settings.colorCount);
      gl.uniform2f(renderProgram.u.uRingPos, ringPosition.x, ringPosition.y);
      gl.uniform1f(renderProgram.u.uTime, simulationTime);
      gl.drawArrays(gl.POINTS, 0, count);
    };

    animationFrame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      disposeField();
      gl.deleteBuffer(quad);
      gl.deleteBuffer(uvBuffer);
      gl.deleteBuffer(referenceBuffer);
      if (simulationProgram) gl.deleteProgram(simulationProgram.prog);
      gl.deleteProgram(renderProgram.prog);
    };
  });
</script>

<div bind:this={host} class="particle-host" style:background aria-hidden="true">
  <canvas bind:this={canvas} class="particle-canvas"></canvas>
</div>

<style>
  .particle-host,
  .particle-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .particle-host {
    z-index: -1;
    min-width: 240px;
    min-height: 160px;
    overflow: hidden;
    pointer-events: none;
  }

  .particle-canvas {
    display: block;
  }
</style>
