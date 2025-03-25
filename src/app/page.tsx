import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          This is a modern portfolio website built with Next.js and Tailwind CSS.
        </p>
      </motion.div>
    </main>
  )
} 