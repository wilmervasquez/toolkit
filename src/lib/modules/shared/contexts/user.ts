import type { User } from '$prisma';
import { UserState } from '$modules/shared/states/user.svelte';
import { setContext, getContext } from 'svelte'

const KEY = Symbol();

export function setUserContext(initialData: User) {
  return setContext(KEY, new UserState(initialData))
}

export function getUserContext() {
  return getContext<ReturnType<typeof setUserContext>>(KEY)
}
