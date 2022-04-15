module.exports = function override (config, env) {
    console.log('override')
    let loaders = config.resolve
    loaders.fallback = {
        
        "zlib": require.resolve("browserify-zlib") ,
         "fs" : require.resolve("browserify-fs") ,
         "net" : require.resolve("net-browserify") ,
        "crypto": require.resolve("crypto-browserify"),
        "path": require.resolve("path-browserify")
    }
    
    return config
}