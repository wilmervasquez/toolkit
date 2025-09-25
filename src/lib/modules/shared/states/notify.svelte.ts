import { second } from "$lib/modules/shared/utils/time"
import { IconAlertTriangleFilled, IconBugFilled, IconCircleCheckFilled, IconInfoCircleFilled } from "@tabler/icons-svelte"
import type { IconsProps } from "@tabler/icons-svelte/icons/icons"
import { onDestroy, type SvelteComponent } from "svelte"

interface Notify {
  id: string
  title: string
  message: string
  type: 'error' | 'info' | 'warning' | 'success' | 'loading',
  icon: typeof SvelteComponent<IconsProps>,
  fg: string
}

export class NotifyState {
  notifies: Notify[] = $state([])
  notifiesToTimeoutMap = new Map()
  constructor() {
    onDestroy(() => {
      for (const timeout of this.notifiesToTimeoutMap.values()) {
        clearTimeout(timeout)
      }
      this.notifiesToTimeoutMap.clear()
    })
  }

  info(title: string, message: string) {
    const id = crypto.randomUUID()

    this.notifies.push({
      id: crypto.randomUUID(),
      title,
      type: 'info',
      message,
      icon: IconInfoCircleFilled,
      fg: 'text-sky-400'
    })

    setTimeout(() => {
      this.remove(id)
    }, second * 20);
  }


  success(title: string, message: string) {
    const id = crypto.randomUUID()
    this.notifies.push({
      id,
      title,
      type: 'success',
      message,
      icon: IconCircleCheckFilled,
      fg: 'text-green-400'
    })

    setTimeout(() => {
      this.remove(id)
    }, second * 20);
    return id
  }

  error(title: string, message: string) {
    const id = crypto.randomUUID()

    this.notifies.push({
      id: crypto.randomUUID(),
      title,
      type: 'error',
      message,
      icon: IconBugFilled,
      fg: 'text-red-400'
    })
    setTimeout(() => {
      this.remove(id)
    }, second * 20);
  }

  warning(title: string, message: string) {
    const id = crypto.randomUUID()

    this.notifies.push({
      id: crypto.randomUUID(),
      title,
      type: 'warning',
      message,
      icon: IconAlertTriangleFilled,
      fg: 'text-yellow-400'
    })
    setTimeout(() => {
      this.remove(id)
    }, second * 20);
  }

  loading(title: string, message: string) {
    const id = crypto.randomUUID()

    this.notifies.push({
      id,
      title,
      type: 'loading',
      message,
      icon: IconAlertTriangleFilled,
      fg: 'text-blue-400'
    })
    return {
      success: (title: string, message: string) => {
        this.remove(id)
        this.success(title, message)
      },
      error: (title: string, message: string) => {
        this.remove(id)
        this.error(title, message)
      }
    }
  }
  remove(notifyId: string) {
    this.notifies = this.notifies.filter(({id})=> id != notifyId)
  }
}
