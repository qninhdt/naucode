const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => ({

    mode: env.development ? "development" : "production",

    entry: "./src/main.tsx",

    devServer: {
        contentBase: './dist',
    },

    ...env.development ? { devtool: 'inline-source-map' } : {},

    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.tsx$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.css$/,
                use: [
                    env.development ? "style-loader" : MiniCssExtractPlugin.loader,
                    {   
                        loader: "css-loader", 
                        options: {
                            sourceMap: env.development,
                        }
                    },
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    env.development ? "style-loader" : MiniCssExtractPlugin.loader,
                    {   
                        loader: "css-loader", 
                        options: { 
                            sourceMap: env.development, 
                            modules: {
                                getLocalIdent: env.development
                                    ? (_, __, name) => name
                                    : getLocalIdentName()
                                // localIdentName: "[local]"
                            }
                        }
                    }, 
                    {
                        loader: "sass-loader",
                        options: { sourceMap: env.development }
                    }
                ]
            },

            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]"
                    }
                }
               
            },

            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: "file-loader"
            }

        ]

    },

    plugins: [
        new HtmlWebpackPlugin({

        }),

        ...env.development ? [] : [
            new MiniCssExtractPlugin(),
            new BundleAnalyzerPlugin()
        ]
    ],

    resolve: {
        alias: {
            "@"         : path.resolve(__dirname, "./src"),
            "react"     : "preact/compat",
            "react-dom" : "preact/compat"
        },
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    
    stats: {
        // warnings: false
    }
})

function getLocalIdentName() {

    let count = 0
    let seeds = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    let identifiers = []

    seeds.forEach(l => {
        seeds.forEach(r => {
            identifiers.push(l + r)
        })
    })

    return () => identifiers[count++]
}