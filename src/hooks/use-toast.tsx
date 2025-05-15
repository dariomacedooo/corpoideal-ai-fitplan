
import * as React from "react"
import { 
  Toast,
  ToastClose, 
  ToastDescription, 
  ToastProvider, 
  ToastTitle, 
  ToastViewport 
} from "@/components/ui/toast"
import { useToast as useToastLib } from "@radix-ui/react-toast"

export const ToastContext = React.createContext<{
  toasts: Toast[]
  addToast: (toast: Toast) => void
  removeToast: (id: string) => void
  updateToast: (id: string, toast: Partial<Toast>) => void
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
  updateToast: () => {},
})

export type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
}

export function useToast() {
  const context = React.useContext(ToastContext)
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  
  return {
    toast: (props: Omit<Toast, "id">) => {
      context.addToast({
        ...props,
        id: Math.random().toString(36).slice(2),
      })
    },
    toasts: context.toasts,
    dismiss: context.removeToast,
    update: context.updateToast,
  }
}

export const toast = (props: Omit<Toast, "id">) => {
  const context = React.useContext(ToastContext)
  if (!context) {
    console.error("toast() called outside of ToastProvider")
    return
  }
  
  context.addToast({
    ...props,
    id: Math.random().toString(36).slice(2),
  })
}

export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Toast) => {
    setToasts((prev) => [...prev, toast])
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])
  
  const updateToast = React.useCallback((id: string, toast: Partial<Toast>) => {
    setToasts((prev) => 
      prev.map((t) => (t.id === id ? { ...t, ...toast } : t))
    )
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, updateToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export { ToastProvider, ToastViewport, ToastClose, ToastTitle, ToastDescription }
