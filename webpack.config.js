const path = require('path');

module.exports = {
    mode: 'development',
    entry: { 'pyret': './src/pyret.ts', 'inmem-rpc': './src/inmem-rpc.ts' },
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
            'fs': require.resolve('@zenfs/core')
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