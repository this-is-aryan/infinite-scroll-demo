module.exports = function (api) {
  api.cache(true)

  const aliases = {
    '@app': './app',
    '@components': './app/components',
    '@screens': './app/screens',
    '@constants': './app/constants',
  }
  const plugins = [["module-resolver", { alias: aliases }]]
  return {
    presets: ["babel-preset-expo"],
    plugins
  }
}