import { useEffect } from 'react'

export const useKeyboardShortcut = (
  shortcut: { code: string; shift?: boolean },
  callback: () => void,
) => {
  const code = shortcut.code
  const shift = 'shift' in shortcut && shortcut.shift
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }
      if (shift !== !!e.shiftKey) return
      if (e.ctrlKey) return
      if (e.metaKey) return
      if (e.code === code) {
        callback()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [callback, code, shift])
}
