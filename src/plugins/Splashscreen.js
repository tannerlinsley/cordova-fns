import { DeviceReady } from './Device'
import { PluginExistenceCheck } from '../Utils'

// Plugin information: https://github.com/apache/cordova-plugin-splashscreen
const pluginName = 'cordova-plugin-splashscreen'

const getPlugin = () => global.navigator.splashscreen
const checkPluginInstalled = PluginExistenceCheck(pluginName, getPlugin)

const getSafePlugin = async () => {
  await DeviceReady()
  checkPluginInstalled()
  return getPlugin()
}

// Hides or shows the splashscreen using a boolean
export const SplashScreenShow = async (set = true) => {
  const plugin = await getSafePlugin()
  if (!set) {
    return plugin.hide()
  }
  return plugin.show()
}
