"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
        aria-label="Toggle theme"
      >
        {mounted && theme === "system" ? (
          <Monitor className="h-5 w-5 transition-all" />
        ) : (
          <>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-md border border-border bg-popover p-1 shadow-md animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => { setTheme("light"); setIsOpen(false); }}
            className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${theme === 'light' ? 'bg-accent/50 text-accent-foreground font-medium' : 'text-foreground/80'}`}
          >
            <Sun className="h-4 w-4" /> Light
          </button>
          <button
            onClick={() => { setTheme("dark"); setIsOpen(false); }}
            className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${theme === 'dark' ? 'bg-accent/50 text-accent-foreground font-medium' : 'text-foreground/80'}`}
          >
            <Moon className="h-4 w-4" /> Dark
          </button>
          <button
            onClick={() => { setTheme("system"); setIsOpen(false); }}
            className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${theme === 'system' ? 'bg-accent/50 text-accent-foreground font-medium' : 'text-foreground/80'}`}
          >
            <Monitor className="h-4 w-4" /> System
          </button>
        </div>
      )}
    </div>
  )
}
