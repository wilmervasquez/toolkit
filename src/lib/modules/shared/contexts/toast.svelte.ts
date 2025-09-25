import type { IconsProps } from "@tabler/icons-svelte/icons/icons";
import type { SvelteComponent } from "svelte";
import { IconAlertTriangleFilled, IconBugFilled, IconCircleCheckFilled, IconInfoCircleFilled } from "@tabler/icons-svelte";
import { getContext, onDestroy, setContext } from "svelte"

type ToastType = 'error' | 'info' | 'warning' | 'success' | 'loading';

interface Toast {
  id: string
  label: string
  message: string
  type: ToastType,
  icon: typeof SvelteComponent<IconsProps>,
  color: string
  duration: number
}

const base: Record<string, Pick<Toast, 'type' | 'icon' | 'color'>> = {
  error: {
    type: 'error',
    icon: IconInfoCircleFilled,
    color: 'text-blue-400'
  },
  info: {
    type: 'info',
    icon: IconCircleCheckFilled,
    color: 'text-blue-400'
  },
  success: {
    type: 'success',
    icon: IconBugFilled,
    color: 'text-green-400'
  },
  warning: {
    type: 'warning',
    icon : IconAlertTriangleFilled,
    color: 'text-yellow-400'
  },
  loading: {
    type: 'loading',
    icon: IconAlertTriangleFilled,
    color: 'text-blue-400'
  }
}

export class ToastStore {
  toasts: Toast[] = $state([])
  toastsToTimeoutMap = new Map<string, ReturnType<typeof setTimeout>>()

  constructor() {
    onDestroy(() => {
      this.#clearAllTimeouts()
    })
  }

  success(label: string, message: string, duration: number = 7000) {
    const id = crypto.randomUUID()
    return this.#add({ id, label, message, ...base.success, duration })
  }

  error(label: string, message: string, duration: number = 7000) {
    const id = crypto.randomUUID()
    return this.#add({ id, label, message, ...base.error, duration })
  }

  warning(label: string, message: string, duration: number = 7000) {
    const id = crypto.randomUUID()
    return this.#add({ id, label, message, ...base.warning, duration })
  }

  info(label: string, message: string, duration: number = 7000) {
    const id = crypto.randomUUID()
    return this.#add({ id, label, message, ...base.info, duration })
  }

  loading(label: string, message: string) {
    const id = crypto.randomUUID()
    this.#add({ id, label, message, ...base.loading, duration: Infinity })

    return {
      success: (label: string, message: string) => {
        this.remove(id)
        this.success(label, message)
      },
      error: (label: string, message: string) => {
        this.remove(id)
        this.error(label, message)
      }
    }
  }

  #add(toast: Toast) {
    this.toasts.unshift(toast)

    if (toast.duration !== Infinity) {
      const timeout = setTimeout(() => {
        this.remove(toast.id)
      }, toast.duration)
      this.toastsToTimeoutMap.set(toast.id, timeout)
    }

    return toast.id
  }

  remove(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id)
    const timeout = this.toastsToTimeoutMap.get(id)
    if (timeout) {
      clearTimeout(timeout)
      this.toastsToTimeoutMap.delete(id)
    }
  }

  #clearAllTimeouts() {
    for (const timeout of this.toastsToTimeoutMap.values()) {
      clearTimeout(timeout)
    }

    this.toastsToTimeoutMap.clear()
  }
}

const key = Symbol()

export function setToastStore() {
  return setContext(key, new ToastStore())
}

export function getToastStore() {
  return getContext<ToastStore>(key)
}

export type { Toast }
