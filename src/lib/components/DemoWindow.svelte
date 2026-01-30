<script lang="ts">
  import Icon from "./Icon.svelte";
  import { onMount } from "svelte";

  interface Props {
    title?: string;
    width?: string;
    height?: string;
    scale?: number;
    showCursor?: boolean;
    class?: string;
  }

  let {
    title = "Llama.cpp Desktop",
    width = "100%",
    height = "100%",
    scale = 1,
    showCursor = true,
    class: className = "",
  }: Props = $props();

  // --- STATE ---
  let isSidebarOpen = $state(true);
  let userInput = $state("");
  let isAiTyping = $state(false);
  let isDropdownOpen = $state(false);
  let selectedModel = $state({
    name: "Llama 3.1 8B",
    full_identifier: "meta-llama/Llama-3.1-8B-Instruct-GGUF",
  });

  let messages = $state([
    {
      role: "assistant",
      content: "hello how can I help you today?",
    },
  ]);

  const chatHistory = [
    { id: "1", title: "Llama cpp", active: true },
    { id: "2", title: "Tauri and Rust Structure", active: false },
    { id: "3", title: "CUDA Configuration", active: false },
  ];

  const models = [
    {
      name: "Llama 3.1 8B",
      full_identifier: "meta-llama/Llama-3.1-8B-Instruct-GGUF",
    },
    {
      name: "Mistral Nemo",
      full_identifier: "mistralai/Mistral-Nemo-Instruct-2407",
    },
    { name: "Phi-3 Mini", full_identifier: "microsoft/Phi-3-mini-4k-instruct" },
  ];

  // --- ACTIONS ---
  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  function handleSend() {
    if (!userInput.trim()) return;

    const userMsg = userInput;
    userInput = "";
    messages.push({ role: "user", content: userMsg });

    isAiTyping = true;

    // Simulate AI response
    setTimeout(() => {
      isAiTyping = false;
      let aiResponse = "";

      if (userMsg.toLowerCase().includes("model")) {
        aiResponse =
          "You can manage your local models in the Models tab. Llama 3.1 is recommended for optimal performance across most general tasks.";
      } else if (userMsg.toLowerCase().includes("help")) {
        aiResponse =
          "Certainly. I can assist with configuring your local llama-server or importing new models via Ollama.";
      } else {
        aiResponse =
          "Understood. I'm processing your request using your system's local hardware acceleration.";
      }

      messages.push({ role: "assistant", content: aiResponse });
    }, 1500);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function selectModel(model: any) {
    selectedModel = model;
    isDropdownOpen = false;
  }

  function toggleDropdown(e: MouseEvent) {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
  }

  onMount(() => {
    const handleClickOutside = () => (isDropdownOpen = false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  });
</script>

<div
  class="demo-window group {className}"
  style="--window-width: {width}; --window-height: {height};"
>
  <!-- Title Bar -->
  <div class="title-bar">
    <div class="window-controls">
      <span class="control red"></span>
      <span class="control yellow"></span>
      <span class="control green"></span>
    </div>
    <div class="window-title">{title}</div>
    <div class="window-actions">
      <span class="status-text">Get llama.cpp</span>
    </div>
  </div>

  <div class="window-content">
    <div class="app-layout">
      <!-- Sidebar -->
      <aside class="sidebar" class:collapsed={!isSidebarOpen}>
        <div class="sidebar-top">
          <button class="icon-btn sidebar-toggle" onclick={toggleSidebar}>
            {#if isSidebarOpen}
              <Icon name="panel-left-close" size={20} />
            {:else}
              <Icon name="panel-left-open" size={20} />
            {/if}
          </button>
        </div>

        {#if isSidebarOpen}
          <div class="sidebar-nav">
            <button class="nav-item active">
              <Icon name="message-square" size={18} />
              <span>Chat</span>
            </button>
            <button class="nav-item">
              <Icon name="box" size={18} />
              <span>Models</span>
            </button>
            <button class="nav-item">
              <Icon name="settings" size={18} />
              <span>Settings</span>
            </button>

            <div class="chat-history">
              <div class="history-label">Chat History</div>
              {#each chatHistory as chat}
                <button class="history-item" class:active={chat.active}>
                  <span>{chat.title}</span>
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <div class="sidebar-footer">
          <div class="user-profile">
            <div class="user-avatar-placeholder">
              <Icon name="user" size={20} />
            </div>
            {#if isSidebarOpen}
              <span class="username">User</span>
            {/if}
          </div>
        </div>
      </aside>

      <!-- Main Chat Area -->
      <main class="chat-main">
        <!-- Header -->
        <header class="chat-header">
          <div class="model-selector-container">
            <button class="model-selector-btn" onclick={toggleDropdown}>
              <span class="model-name-text">{selectedModel.name}</span>
              <Icon
                name="chevron-down"
                size={14}
                class={isDropdownOpen ? "rotate-180" : ""}
              />
            </button>

            {#if isDropdownOpen}
              <div class="model-dropdown">
                {#each models as model}
                  <button
                    class="dropdown-item"
                    onclick={() => selectModel(model)}
                  >
                    <div class="model-info">
                      <span class="m-name">{model.name}</span>
                      <span class="m-id">{model.full_identifier}</span>
                    </div>
                    {#if selectedModel.name === model.name}
                      <Icon name="check" size={14} class="check-icon" />
                    {/if}
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </header>

        <!-- Messages -->
        <div class="messages-container thin-scrollbar">
          {#if messages.length === 1 && !isAiTyping && userInput === ""}
            <div class="empty-state">
              <h1 class="logo-text">llama.cpp</h1>
              <p class="subtitle-text">
                Type a message or upload files to get started
              </p>
            </div>
          {:else}
            {#each messages as msg}
              <div class="message-row">
                <div class="avatar-col">
                  {#if msg.role === "assistant"}
                    <div class="ai-avatar">
                      <Icon name="bot" size={18} />
                    </div>
                  {:else}
                    <div class="user-avatar">
                      <Icon name="user" size={18} />
                    </div>
                  {/if}
                </div>
                <div class="content-col">
                  <div class="msg-bubble">
                    {msg.content}
                  </div>
                </div>
              </div>
            {/each}
          {/if}

          {#if isAiTyping}
            <div class="message-row">
              <div class="avatar-col">
                <div class="ai-avatar">
                  <Icon name="bot" size={18} />
                </div>
              </div>
              <div class="content-col">
                <div class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          {/if}
        </div>

        <!-- Input -->
        <div class="input-container">
          <form
            class="chat-form"
            onsubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <textarea
              bind:value={userInput}
              onkeydown={handleKeydown}
              placeholder="Message llama-desktop..."
              rows="1"
            ></textarea>

            <div class="form-footer">
              <button type="button" class="form-icon-btn"
                ><Icon name="paperclip" size={20} /></button
              >
              <div class="footer-right">
                <button type="button" class="form-icon-btn"
                  ><Icon name="mic" size={20} /></button
                >
                <button
                  type="submit"
                  class="send-btn"
                  disabled={!userInput.trim() || isAiTyping}
                >
                  <Icon name="arrow-up" size={18} />
                </button>
              </div>
            </div>
          </form>
          <div class="footer-legal">
            Llama-desktop can make mistakes. Check important info.
          </div>
        </div>
      </main>
    </div>
  </div>
</div>

<style>
  /* --- THEME COLORS (Based on Project OKLCH) --- */
  .demo-window {
    --app-bg: #212121;
    --sidebar-bg: #171717;
    --border-color: rgba(255, 255, 255, 0.1);
    --text-primary: #ececec;
    --text-secondary: #b4b4b4;
    --text-muted: #707070;
    --accent-bg: rgba(255, 255, 255, 0.05);
    --accent-hover: rgba(255, 255, 255, 0.08);
    --accent-active: rgba(255, 255, 255, 0.12);
    --radius: 12px;

    position: relative;
    width: var(--window-width);
    height: var(--window-height);
    background: var(--app-bg);
    border-radius: var(--radius);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow:
      0 40px 100px rgba(0, 0, 0, 0.5),
      0 0 0 1px var(--border-color);
    z-index: 110;
    user-select: none;
    margin: 0 auto;
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      sans-serif;
    color: var(--text-primary);
  }

  .thin-scrollbar::-webkit-scrollbar {
    width: 5px;
  }
  .thin-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  .thin-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Title Bar */
  .title-bar {
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    border-bottom: 1px solid var(--border-color);
    background: #1e1e1e;
    z-index: 10;
  }

  .window-controls {
    display: flex;
    gap: 8px;
  }
  .control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .red {
    background: #ff5f56;
  }
  .yellow {
    background: #ffbd2e;
  }
  .green {
    background: #27c93f;
  }

  .window-title {
    font-size: 11px;
    font-weight: 500;
    color: var(--text-secondary);
    opacity: 0.8;
  }

  .window-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .status-text {
    font-size: 10px;
    color: #8a8a8a;
    font-weight: 500;
  }

  /* App Layout */
  .window-content {
    flex: 1;
    min-heirgb(75, 75, 75)
  }
  .app-layout {
    display: flex;
    height: 100%;
  }

  /* Sidebar */
  .sidebar {
    width: 260px;
    background: var(--sidebar-bg);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }
  .sidebar.collapsed {
    width: 60px;
  }

  .sidebar-top {
    padding: 12px;
    display: flex;
  }
  .icon-btn {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-btn:hover {
    background: var(--accent-hover);
    color: white;
  }

  .sidebar-nav {
    flex: 1;
    padding: 0 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s;
  }
  .nav-item:hover {
    background: var(--accent-hover);
    color: white;
  }
  .nav-item.active {
    background: var(--accent-active);
    color: white;
  }

  .chat-history {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .history-label {
    padding: 8px 12px;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .history-item {
    padding: 8px 12px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: var(--text-secondary);
    font-size: 13px;
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .history-item:hover {
    background: var(--accent-hover);
    color: white;
  }
  .history-item.active {
    background: var(--accent-active);
    color: white;
  }

  .sidebar-footer {
    padding: 12px;
    border-top: 1px solid var(--border-color);
  }
  .user-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px;
  }
  .user-avatar-placeholder {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--accent-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
  }
  .username {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
  }

  /* Main Chat Area */
  .chat-main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    background: var(--app-bg);
  }

  .chat-header {
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--border-color);
    padding: 0 16px;
  }

  .model-selector-container {
    position: relative;
  }
  .model-selector-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #2a2a2a;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 6px 14px;
    color: var(--text-primary);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .model-selector-btn:hover {
    background: #333;
    border-color: rgba(255, 255, 255, 0.2);
  }

  .model-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    background: #2a2a2a;
    border: 1px solid var(--border-color);
    border-radius: 14px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    z-index: 100;
  }

  .dropdown-item {
    width: 100%;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    text-align: left;
  }
  .dropdown-item:hover {
    background: var(--accent-hover);
  }

  .model-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .m-name {
    font-size: 13px;
    font-weight: 600;
    color: white;
  }
  .m-id {
    font-size: 11px;
    color: var(--text-secondary);
  }
  .check-icon {
    color: white;
  }

  /* Messages Container */
  .messages-container {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 20px 0;
  }

  .empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .logo-text {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }
  .subtitle-text {
    font-size: 16px;
    color: var(--text-secondary);
    opacity: 0.8;
  }

  .message-row {
    display: flex;
    gap: 16px;
    padding: 12px 24px;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }

  .avatar-col {
    flex-shrink: 0;
  }
  .ai-avatar,
  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ai-avatar {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }
  .user-avatar {
    background: #333;
    color: var(--text-secondary);
  }

  .content-col {
    flex: 1;
    min-width: 0;
  }
  .msg-bubble {
    font-size: 15px;
    line-height: 1.6;
    color: var(--text-primary);
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* Typing Indicator */
  .typing-indicator {
    display: flex;
    gap: 4px;
    padding-top: 8px;
  }
  .typing-indicator span {
    width: 5px;
    height: 5px;
    background: var(--text-muted);
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
  }
  .typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes typing {
    0%,
    100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    50% {
      transform: translateY(-4px);
      opacity: 1;
    }
  }

  /* Input Container */
  .input-container {
    padding: 0 24px 20px;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }
  .chat-form {
    background: #2a2a2a;
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: shadow 0.2s;
  }
  .chat-form:focus-within {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  textarea {
    width: 100%;
    min-height: 24px;
    max-height: 150px;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    color: white;
    font-size: 15px;
    line-height: 1.5;
    padding: 0;
  }
  textarea::placeholder {
    color: var(--text-muted);
  }

  .form-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .form-icon-btn {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form-icon-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }

  .footer-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .send-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ececec;
    color: #000;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  .send-btn:hover:enabled {
    transform: scale(1.05);
    background: white;
  }
  .send-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .footer-legal {
    text-align: center;
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 10px;
  }

  @media (max-width: 800px) {
    .sidebar {
      width: 60px;
    }
    .nav-item span,
    .history-label,
    .chat-history,
    .username {
      display: none;
    }
    .sidebar.collapsed {
      width: 0;
      padding: 0;
      border: none;
    }
  }
</style>
