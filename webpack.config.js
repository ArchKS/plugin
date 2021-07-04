const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCss = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")


module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    mode: "development",
    plugins: [
        new HtmlPlugin({
            template: './src/index.html'
        }),
        new MiniCss({
            filename: 'style.css'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCss.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
        ]
    }
}