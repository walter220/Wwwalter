const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const extractCss = new ExtractTextPlugin('main.css');
const extractSass = new ExtractTextPlugin('main.css');

module.exports = {
    entry: {
        main: './src/js/index.js',
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: ['css-loader', 'sass-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('stylelint')(),
                                require('autoprefixer')(),
                            ],
                        },
                    }],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'eslint-loader',
                    },
                ],
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        extractCss,
        extractSass,
        new StylelintPlugin(),
    ],
};