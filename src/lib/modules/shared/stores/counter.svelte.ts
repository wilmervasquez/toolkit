export const count = $state({
  value: 0,
  increment() {
    this.value += 1
  }
})

let county = $state(0);
export const workspace = {
  get theme() {
    return county
  },
  set theme(value) {
    county = value
  }
}

export function createCounter (){
  let count = $state(0)

  const write = (v: number) => {
    count = v
  }

  const read = () => {
    return count
  }

  return { count, write, read }
}

export function createCounter2 (){
  let count = $state(0)

  return {
    get count() {
      return count
    },
    set count(v) {
      count = v
    }
  }
}

export class Counter {
  count = $state(12)
  increment = () => {
    this.count = 2
  }
}
