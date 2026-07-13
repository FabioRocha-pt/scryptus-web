// Estado partilhado entre o Preloader e os elementos que animam à entrada:
// o hero só começa a animar quando a cortina do preloader começa a subir.
let done = false
const listeners = new Set<() => void>()

export function markLoaderDone() {
  if (done) return
  done = true
  listeners.forEach((listener) => listener())
}

export function subscribeLoader(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function isLoaderDone() {
  return done
}
