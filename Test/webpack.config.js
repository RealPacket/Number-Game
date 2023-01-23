import { resolve } from 'path';

export const entry = './JS/index.js';
export const output = {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
};
export const module = {
    rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }
    ]
};
