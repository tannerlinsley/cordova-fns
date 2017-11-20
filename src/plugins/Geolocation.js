import { DeviceReady } from './Device'
import { PluginExistenceCheck } from '../Utils'

// Plugin information: https://github.com/apache/cordova-plugin-geolocation
const pluginName = 'cordova-plugin-geolocation'

// Check to make sure the plugin is installed, if not, throw an error
const getPlugin = () => global.navigator.gelocation
const checkPluginInstalled = PluginExistenceCheck(pluginName, getPlugin)

const getSafePlugin = async () => {
  await DeviceReady()
  checkPluginInstalled()
  return getPlugin()
}

// Gets the device's current location one time.
export const GeoGetCurrentPosition = async options => {
  const plugin = await getSafePlugin()
  return new Promise((resolve, reject) => plugin.getCurrentPosition(resolve, reject, options))
}

// Watches the device's current location until the user stops the watcher
// by calling the resolved unsubscribe function
export const GeoWatchPosition = async (...args) => {
  const plugin = await getSafePlugin()
  return new Promise(resolve => {
    // Proxy the arguments to the watcher, and get the id.
    const id = plugin.watchPosition(...args)
    // Resolve the user a function that will stop the watcher
    const unwatcher = () => plugin.clearWatch(id)
    unwatcher.id = id // Give them the id, just in case I guess :)
    resolve(unwatcher)
  })
}
