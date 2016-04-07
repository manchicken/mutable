'use strict'

/**
 * We need to be able to make config files, and we want this to be particularly dynamic.
 */

const _ = require( 'lodash' )

const GenerateConfig = {
  
  /**
   * Serialize config data to a string for transmission to the server
   *
   * @param [Map]    serializers     The list of serializers
   * @param [Object] finalConfigData The final set of config data
   *
   * @returns [String] Returns a string containing serialized config data.
   */
  serializeConfig : function serializeConfig(serializers, finalConfigData) {
    let selectedSerializer = serializers.get( finalConfigData.serializer )
    
    return selectedSerializer.serializeData( finalConfigData.data )
  },
  
  /**
   * Construct a complete config file - in Object form - based on the config data and
   * config definition. Regardless of the markup used for the config, this function
   * outputs the full structure in JavaScript objects for the config. Serialization is a
   * different step.
   *
   * @param [Object] configData       The configuration data
   * @param [Object] configDefinition The definition and structure of the config file.
   *
   * @returns [Object] Returns an object containing the config structure and data
   */
  applyConfig : function applyConfig(configData, configDefinition) {
    return configDefinition.map(( entry ) => {
      return configData[ entry ]
    })
  },
  
  /**
   * Generate a full config based on the generic configs, the server configs, and the specific
   * config key within the setup.
   *
   * @param [Object] configData          The data containing config values
   * @param [Object] configDefinition    This defines the structure and rules of the config file
   * @param [Map]    serializers         The map of available serializers for the config
   *
   * @returns [String] The serialized config data
   */
  generateConfig : function generateConfig(configData, configDefinition, serializers) {
    
    return GenerateConfig.serializeConfig(
      serializers,
      
      GenerateConfig.applyConfig(
        configData,
        configDefinition
      )
    )
  }
}