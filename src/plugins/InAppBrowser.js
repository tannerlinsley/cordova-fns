import { DeviceReady } from './Device'
import { PluginExistenceCheck } from '../Utils'

// Plugin information: https://github.com/apache/cordova-plugin-splashscreen
const pluginName = 'cordova-plugin-inappbrowser'
const getPlugin = () => global.cordova && global.cordova.InAppBrowser
const checkPluginInstalled = PluginExistenceCheck(pluginName, getPlugin)

const getSafePlugin = async () => {
  await DeviceReady()
  checkPluginInstalled()
  return getPlugin()
}

// Methods
export const InAppBrowserOpen = async (...args) => {
  const plugin = await getSafePlugin()
  // Returns a ref to the InAppBrowser instance
  return plugin.open(...args)
}

// TODO: possibly implement proxy fns for the returned ref?
