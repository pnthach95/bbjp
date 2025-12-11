const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withUniwindConfig} = require('uniwind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  // Fix axios RN 79 https://github.com/axios/axios/issues/6899#issuecomment-2873130573
  resolver: {
    resolveRequest: (context, moduleImport, platform) => {
      // Use the browser version of the package for React Native
      if (moduleImport === 'axios' || moduleImport.startsWith('axios/')) {
        return context.resolveRequest(
          {
            ...context,
            unstable_conditionNames: ['browser'],
          },
          moduleImport,
          platform,
        );
      }

      // Fall back to normal resolution
      return context.resolveRequest(context, moduleImport, platform);
    },
  },
};

module.exports = withUniwindConfig(
  mergeConfig(getDefaultConfig(__dirname), config),
  {
    cssEntryFile: './src/global.css',
    dtsFile: './src/typings/uniwind-types.d.ts',
  },
);
