export const debounce = (fn: (...p: any[]) => void, delay: number) => {
  let timeout: any;

  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout)


    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}