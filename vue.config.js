module.exports = {
  pwa: {
    name: 'COVID-Bouncer',
    themeColor: '#b51783',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/registerServiceWorker.js'
    },
    manifestOptions: {
      short_name: 'COVID-Bouncer'
    }
  }
}
