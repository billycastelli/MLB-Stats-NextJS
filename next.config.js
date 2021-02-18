module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    })

    return config
  },
}
