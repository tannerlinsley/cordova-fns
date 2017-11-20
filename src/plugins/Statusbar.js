import { DeviceReady } from './Device'
import { PluginExistenceCheck } from '../Utils'

// Plugin information: https://github.com/apache/cordova-plugin-statusbar
const pluginName = 'cordova-plugin-statusbar'

const getPlugin = () => global.StatusBar
const checkPluginInstalled = PluginExistenceCheck(pluginName, getPlugin)

const getSafePlugin = async () => {
  await DeviceReady()
  checkPluginInstalled()
  return getPlugin()
}

const EventStatusTap = 'statusTap'

// Methods
export const StatusBarOverlaysWebView = async val => {
  const plugin = await getSafePlugin()
  return plugin.overlaysWebView(val)
}

export const StatusBarStyleDefault = async () => {
  const plugin = await getSafePlugin()
  return plugin.styleDefault()
}

export const StatusBarStyleLightContent = async () => {
  const plugin = await getSafePlugin()
  return plugin.styleLightContent()
}

export const StatusBarStyleBlackTranslucent = async () => {
  const plugin = await getSafePlugin()
  return plugin.styleBlackTranslucent()
}

export const StatusBarStyleBlackOpaque = async () => {
  const plugin = await getSafePlugin()
  return plugin.styleBlackOpaque()
}

export const StatusBarBackgroundColorByName = async colorName => {
  const plugin = await getSafePlugin()
  return plugin.backgroundColorByName(colorName)
}

export const StatusBarBackgroundColorByHexString = async hex => {
  const plugin = await getSafePlugin()
  return plugin.backgroundColorByHexString(hex)
}

export const StatusBarHide = async () => {
  const plugin = await getSafePlugin()
  return plugin.hide()
}

export const StatusBarShow = async () => {
  const plugin = await getSafePlugin()
  return plugin.show()
}

// Properties
export const StatusBarIsVisible = async () => {
  const plugin = await getSafePlugin()
  return plugin.isVisible
}

// Listeners
export const StatusBarOnTap = async cb => {
  await getSafePlugin()
  global.addEventListener(EventStatusTap, cb)
  // Return an unsubscribe fumction
  return () => global.removeEventListener(EventStatusTap, cb)
}
