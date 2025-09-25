import type { ActionResult } from "@sveltejs/kit";
import { deserialize } from "$app/forms";

interface IFormAction {
  [key: string]: (q: Record<string, string | Blob>) => Promise<ActionResult>;
}

export const FormAction = new Proxy<IFormAction>({}, {
  get(target, prop: string) {
    return async function(q: Record<string, string | Blob>): Promise<ActionResult> {
      const fd = new FormData()

      for (const key in q) {
        fd.append(key, q[key])
      }

      const response = await fetch(`?/${prop}`, {
        method: 'POST',
        body: fd,
        headers: {
          'x-sveltekit-action': 'true'
        }
      });
      return deserialize(await response.text());
    }
  }
})

export const createApi = (url: string) => {
  return new Proxy({}, {
    get(target, prop: string) {
      return async (id: number) => {
        const resource = `${url}/${prop}/${id}`;
        const response = await fetch(resource);
        if (response.ok) await response.json();
        return Promise.reject({ error: `Something wrong happened with ${resource}` })
      }
    }
  })
}

export const ApiClient = new Proxy({}, {
  get(target, prop: string) {
    return async (id: number) => {
      const resource = `/api/${prop}/${id}`;
      const response = await fetch(resource);
      if (response.ok) await response.json();
      return Promise.reject({ error: `Something wrong happened with ${resource}` })
    }
  }
})

export function getNewUrlSearchParams(search: Record<string, string>) {
  const urlSearchParams = new URLSearchParams(location.search)

  for (const key in search) {
    urlSearchParams.set(key, search[key])
  }
  return urlSearchParams.toString()
}
