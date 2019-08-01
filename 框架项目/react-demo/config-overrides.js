const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
    // webpack config
    config.output.publicPath = ''
    // config antd or antd-mobile
    config = injectBabelPlugin([
        'import', {
            libraryName: 'antd',
            style: true
        }
    ], config);
    // config less
    config = rewireLess.withLoaderOptions({
        modifyVars: {
            "@primary-color": "#1DA57A"
        },
        javascriptEnabled: true
    })(config, env);
    return config;
};