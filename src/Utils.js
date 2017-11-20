import { PluginNotFound } from './Errors'

export const PluginExistenceCheck = (pluginName, getDependency) => {
  if (!getDependency()) {
    throw PluginNotFound(pluginName)
  }
}
