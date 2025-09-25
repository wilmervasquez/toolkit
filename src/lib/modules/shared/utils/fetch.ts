export class ApiClient {
  static async get<T>(pathname: string, query: Record<string,string>): Promise<T | null> {
    try {
      const res = await fetch(`/api/v1/${pathname}${new URLSearchParams(query).toString()}`);
      if (!res.ok) return null

      return await res.json() as T
    } catch {
      return null
    }
  }
}
