import type { IconsProps } from "@tabler/icons-svelte/icons/icons"
import { IconAlertTriangleFilled, IconBugFilled, IconCircleCheckFilled, IconInfoCircleFilled } from "@tabler/icons-svelte"

import { second } from "$lib/modules/shared/utils/time"
import { getContext, onDestroy, setContext, SvelteComponent } from "svelte"


type NotifyKind = 'error' | 'info' | 'warning' | 'success' | 'loading';
type NotificationType = 'error' | 'info' | 'warning' | 'success' | 'loading';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  icon: typeof SvelteComponent<IconsProps>;
  fg: string; // foreground color for styling
  duration?: number; // Optional duration in milliseconds for auto-removal
}

export class NotificationFactory {
  static create(type: NotificationType, title: string, message: string): Notification {
    const id = crypto.randomUUID();
    let icon: typeof SvelteComponent<IconsProps>;
    let fg: string;
    let duration: number | undefined = undefined;

    switch (type) {
      case 'info':
        icon = IconInfoCircleFilled;
        fg = 'text-sky-400';
        break;
      case 'success':
        icon = IconCircleCheckFilled;
        fg = 'text-green-400';
        duration = second * 20; // 20 segundos para éxito
        break;
      case 'error':
        icon = IconBugFilled;
        fg = 'text-red-400';
        break;
      case 'warning':
        icon = IconAlertTriangleFilled;
        fg = 'text-yellow-400';
        break;
      case 'loading':
        icon = IconAlertTriangleFilled; // Considerar un ícono de carga diferente
        fg = 'text-blue-400';
        break;
      default:
        // Manejar tipo desconocido o un default
        icon = IconInfoCircleFilled;
        fg = 'text-gray-400';
    }

    return { id, title, message, type, icon, fg, duration };
  }
}

export class NotificationStore {
  public notifications: Notification[] = $state([]);
  private timeouts = new Map<string, ReturnType<typeof setTimeout>>();

  constructor() {
    // Limpia los timeouts al destruir la instancia (útil en Svelte components)
    onDestroy(() => {
      this.clearAllTimeouts();
    });
  }

  add(notification: Notification) {
    this.notifications.push(notification);
    if (notification.duration) {
      const timeout = setTimeout(() => {
        this.remove(notification.id);
      }, notification.duration);
      this.timeouts.set(notification.id, timeout);
    }
  }

  remove(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    const timeout = this.timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }
  }

  update(id: string, updates: Partial<Notification>) {
    this.notifications = this.notifications.map(n =>
      n.id === id ? { ...n, ...updates } : n
    );
  }

  private clearAllTimeouts() {
    for (const timeout of this.timeouts.values()) {
      clearTimeout(timeout);
    }
    this.timeouts.clear();
  }
}

export class NotificationManager {
  constructor(private store: NotificationStore) {}

  info(title: string, message: string) {
    const notification = NotificationFactory.create('info', title, message);
    this.store.add(notification);
  }

  success(title: string, message: string) {
    const notification = NotificationFactory.create('success', title, message);
    this.store.add(notification);
  }

  error(title: string, message: string) {
    const notification = NotificationFactory.create('error', title, message);
    this.store.add(notification);
  }

  warning(title: string, message: string) {
    const notification = NotificationFactory.create('warning', title, message);
    this.store.add(notification);
  }

  loading(title: string, message: string): string {
    const notification = NotificationFactory.create('loading', title, message);
    this.store.add(notification);
    return notification.id; // Retorna el ID para poder actualizarla/removerla manualmente
  }

  remove(id: string) {
    this.store.remove(id);
  }

  update(id: string, type: NotificationType, title: string, message: string) {
    const updatedNotification = NotificationFactory.create(type, title, message);
    // Asegurarse de mantener el ID original
    this.store.update(id, {
        type: updatedNotification.type,
        title: updatedNotification.title,
        message: updatedNotification.message,
        icon: updatedNotification.icon,
        fg: updatedNotification.fg,
        duration: updatedNotification.duration // Puedes decidir si el timeout se mantiene o se reinicia
    });
  }

  get notifications() {
    return this.store.notifications;
  }
}

interface Notify {
  id: string
  title: string
  message: string
  kind: NotifyKind,
  icon: typeof SvelteComponent<IconsProps>,
  fg: string
}

let notifies: Notify[] = $state([])

function showInformationMessage(title: string, message: string) {
  notifies.push({
    id: crypto.randomUUID(),
    title,
    kind: 'info',
    message,
    icon: IconInfoCircleFilled,
    fg: 'text-sky-400'
  })

}

function showSuccessMessage(title: string, message: string) {
  const id = crypto.randomUUID()
  notifies.push({
    id,
    title,
    kind: 'success',
    message,
    icon: IconCircleCheckFilled,
    fg: 'text-green-400'
  })

  setTimeout(() => {
    removeInformationMessage(id)
  }, second * 20);
}

function showErrorMessage(title: string, message: string) {
  notifies.push({
    id: crypto.randomUUID(),
    title,
    kind: 'error',
    message,
    icon: IconBugFilled,
    fg: 'text-red-400'
  })
}
function showWarningMessage(title: string, message: string) {
  notifies.push({
    id: crypto.randomUUID(),
    title,
    kind: 'warning',
    message,
    icon: IconAlertTriangleFilled,
    fg: 'text-yellow-400'
  })
}

export function getNotifies() {
  return notifies
}

export function removeInformationMessage(notifyId: string) {
  notifies = notifies.filter(({id})=> id != notifyId)
}

export default {
  showErrorMessage,
  showInformationMessage,
  showWarningMessage,
  showSuccessMessage,
}

export const Notify = {
  showErrorMessage,
  showInformationMessage,
  showWarningMessage,
  showSuccessMessage,
}

export class NotifyState {
  notifies: Notify[] = $state([])
  notidiesToTioutMap = new Map()
  constructor() {
    onDestroy(() => {
      for (const timeout of this.notidiesToTioutMap.values()) {
        clearTimeout(timeout)
      }
      this.notidiesToTioutMap.clear()
    })
  }
}

export const notify = {
  info(title: string, message: string) {
    notifies.push({
      id: crypto.randomUUID(),
      title,
      kind: 'info',
      message,
      icon: IconInfoCircleFilled,
      fg: 'text-sky-400'
    })

  },

  success(title: string, message: string) {
    const id = crypto.randomUUID()
    notifies.push({
      id,
      title,
      kind: 'success',
      message,
      icon: IconCircleCheckFilled,
      fg: 'text-green-400'
    })

    setTimeout(() => {
      removeInformationMessage(id)
    }, second * 20);
  },

  error(title: string, message: string) {
    notifies.push({
      id: crypto.randomUUID(),
      title,
      kind: 'error',
      message,
      icon: IconBugFilled,
      fg: 'text-red-400'
    })
  },
  warning(title: string, message: string) {
    notifies.push({
      id: crypto.randomUUID(),
      title,
      kind: 'warning',
      message,
      icon: IconAlertTriangleFilled,
      fg: 'text-yellow-400'
    })
  },
  loading(title: string, message: string) {
    const id = crypto.randomUUID()

    notifies.push({
      id,
      title,
      kind: 'loading',
      message,
      icon: IconAlertTriangleFilled,
      fg: 'text-blue-400'
    })
    return id
  }
}

const NOTIFY_KEY = Symbol('notify.state')

export function setNotifyState() {
  return setContext(NOTIFY_KEY, new NotifyState())
}

export function getNotifyState( ) {
  return getContext<NotifyState>(NOTIFY_KEY)
}
