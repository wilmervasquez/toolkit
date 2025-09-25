import { NotifyState } from '$modules/shared/states/notify.svelte';
import { setContext, getContext } from 'svelte'

const KEY = Symbol('notify');

export function setNotifyContext() {
  return setContext(KEY, new NotifyState())
}

export function getNotifyContext() {
  return getContext<NotifyState>(KEY)
}
