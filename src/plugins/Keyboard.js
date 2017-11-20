import { DeviceReady } from './Device'
import { PluginExistenceCheck } from '../Utils'

// Plugin information: https://github.com/apache/cordova-plugin-splashscreen
const pluginName = 'cordova-plugin-splashscreen'
const getPlugin = () => global.cordova && global.cordova.plugins && global.cordova.plugins.Keyboard
const checkPluginInstalled = PluginExistenceCheck(pluginName, getPlugin)

const getSafePlugin = async () => {
  await DeviceReady()
  checkPluginInstalled()
  return getPlugin()
}

const EventOnKeyboardShow = 'native.keyboardshow'
const EventOnKeyboardHide = 'native.keyboardhide'

// Methods
export const KeyboardHideAccessoryBar = async (set = true) => {
  const plugin = await getSafePlugin()
  return plugin.hideKeyboardAccessoryBar(set)
}
export const KeyboardClose = async () => {
  const plugin = await getSafePlugin()
  return plugin.close()
}
export const KeyboardDisableScroll = async (set = true) => {
  const plugin = await getSafePlugin()
  return plugin.disableScroll(set)
}
export const KeyboardShow = async (set = true) => {
  const plugin = await getSafePlugin()
  return plugin.show(set)
}

// Properties
export const KeyboardIsVisible = async () => {
  const plugin = await getSafePlugin()
  return plugin.isVisible
}

// Listeners
export const KeyboardOnShow = async cb => {
  await getSafePlugin()
  global.addEventListener(EventOnKeyboardShow, cb)
  return () => {
    global.removeEventListener(EventOnKeyboardShow, cb)
  }
}

export const KeyboardOnHide = async cb => {
  await getSafePlugin()
  global.addEventListener(EventOnKeyboardHide, cb)
  return () => {
    global.removeEventListener(EventOnKeyboardHide, cb)
  }
}
