module.exports = {
    presets: [
        'babel-preset-expo'
    ],
    plugins: [
        ['module:react-native-dotenv', {
            path: '.env', 
            blacklist: null, 
            whitelist: null,
            safe: false, 
          }],
    ]
}