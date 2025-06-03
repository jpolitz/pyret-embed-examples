const path = require('path');

module.exports = {
    mode: 'development',
    entry: { 'pyret': './src/pyret.ts', 'default-rpcs': './src/default-rpcs.ts' },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            'fs': require.resolve('@zenfs/core'),
            'path': require.resolve('path-browserify')
        }
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'module',
        path: path.resolve(__dirname, 'dist')
    },
    experiments: {
        outputModule: true,
    }
};