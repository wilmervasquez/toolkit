export const second = 1000;
export const minute = second * 60;
export const hour = minute * 60;
export const day = hour * 24;

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const WEAK = DAY * 7;

export async function sleep(timeout: number) {
  return new Promise((res)=>{
    setTimeout(() => {
      res(null)
    }, timeout);
  })
}
