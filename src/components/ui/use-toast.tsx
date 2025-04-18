"use client";

import { useState } from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToastActionElement = React.ReactElement

export type ToastProps = {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactElement
    variant?: "default" | "destructive"
}

let count = 0

function genId() {
    count = (count + 1) % Number.MAX_VALUE
    return count.toString()
}

const toasts: ToastProps[] = []

type UseToastOptions = {
    duration?: number
}

export function toast({
    title,
    description,
    action,
    variant,
}: Omit<ToastProps, "id">) {
    const id = genId()

    const update = (props: Omit<ToastProps, "id">) => {
        // Update the toast with the specified props
        const toast = toasts.find((t) => t.id === id)
        if (toast) {
            Object.assign(toast, { ...props })
        }
    }

    const dismiss = () => {
        // Remove the toast from the list if it exists
        const index = toasts.findIndex((t) => t.id === id)
        if (index !== -1) {
            toasts.splice(index, 1)
        }
    }

    const newToast: ToastProps = {
        id,
        title,
        description,
        action,
        variant,
    }

    toasts.push(newToast)

    if (toasts.length > TOAST_LIMIT) {
        toasts.shift()
    }

    return {
        id,
        dismiss,
        update,
    }
}

export function useToast() {
    // In a real implementation, we would use React context
    // This is a simplified version
    const toast = ({ title, description, action, variant = "default" }: Omit<ToastProps, "id">) => {
        // Create a fake toast object
        // In a real implementation, we'd add this to a context
        const id = Date.now().toString();

        // Log toast for debugging
        console.log("Toast triggered:", { id, title, description });

        return {
            id,
            dismiss: () => {
                // Would dismiss the toast in a real implementation
            },
            update: () => {
                // Would update the toast in a real implementation
            },
        };
    };

    return {
        toast,
        dismiss: (toastId?: string) => {
            // Would dismiss toasts in a real implementation
        },
    };
} 