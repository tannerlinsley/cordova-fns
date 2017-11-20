let ReadyPromise

export const DeviceReady = () => {
  if (!ReadyPromise) {
    ReadyPromise = new Promise(resolve => document.addEventListener('deviceready', resolve, false))
  }
  return ReadyPromise
}
