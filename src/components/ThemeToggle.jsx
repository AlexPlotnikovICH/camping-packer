import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg transition-colors duration-300 z-50">
      <button
        onClick={() => theme === 'dark' && toggleTheme()}
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === 'light'
            ? 'bg-white text-yellow-500 shadow-md scale-110'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        aria-label="Switch to light mode"
      >
        <Sun size={20} />
      </button>
      <button
        onClick={() => theme === 'light' && toggleTheme()}
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gray-700 text-blue-400 shadow-md scale-110'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        aria-label="Switch to dark mode"
      >
        <Moon size={20} />
      </button>
    </div>
  )
}
