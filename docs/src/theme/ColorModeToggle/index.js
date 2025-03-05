import React from 'react'
import { useColorMode } from '@docusaurus/theme-common'

export default function ColorModeToggle() {
  const { colorMode, setColorMode } = useColorMode()

  const toggleColorMode = () => {
    // Add transitioning class before changing theme
    document.documentElement.classList.add('transitioning')

    // Change the theme
    setColorMode(colorMode === 'dark' ? 'light' : 'dark')

    // Remove transitioning class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('transitioning')
    }, 750) // Match the transition duration in CSS
  }

  return (
    <button
      onClick={toggleColorMode}
      style={{
        background: 'none',
        border: 'none',
        padding: '8px',
        cursor: 'pointer',
        borderRadius: '4px',
      }}
    >
      {colorMode === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
