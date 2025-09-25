import { getContext, setContext } from "svelte";

class UserContext {
  id = crypto.randomUUID()
  email = '2023210234@udh.edu.pe'
  name = 'Juan Carlos'
  lastName = 'Patrinius Suarez'
  avatarUrl = '	https://mockmind-api.uifaces.co/content/human/92.jpg'
  auth = true
  constructor() {

  }
}

export function setUserContext() {
  return setContext('m', new UserContext())
}

export function getUserContext(): UserContext {
  return getContext('m')
}
