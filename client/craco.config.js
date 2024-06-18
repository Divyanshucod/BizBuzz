
module.exports = {
    webpack:{
        configure:(webpackConfig) => {
            webpackConfig.resolve.fallback = {
                ...webpackConfig.resolve.fallback,
                'util':require.resolve('util/')
            };
            return webpackConfig;
        }
    }
}