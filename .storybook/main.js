const path = require('path');
const { merge } = require('webpack-merge');

const maxAssetSize = 1024 * 1024;

const includedStories = process.env.STORYBOOK_ENV === 'docs' ? '(stories)' : '(stories|visual)';

module.exports = {
    stories: ['../src/Docs/introduction.stories.mdx', `../src/**/*.@${includedStories}.js`],

    addons: [
        '@storybook/addon-knobs/register',
        '@storybook/addon-a11y',
        '@storybook/addon-actions/register',
        '@storybook/addon-cssresources/register',
        '@storybook/addon-storysource/register',
        '@storybook/addon-viewport/register',
        '@storybook/addon-docs',
        'storybook-addon-i18n/register'
    ],

    webpackFinal: async(config) => {
        config.entry = ['core-js', ...config.entry];
        config.module.rules.push({
            test: /\.stories\.js?$/,
            use: [{ loader: 'story-description-loader' }],
        });

        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
          });

        return merge(config, {
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    minSize: 30 * 1024,
                    maxSize: maxAssetSize,
                },
                runtimeChunk: true,
              },
              performance: {
                hints: 'warning',
                maxAssetSize: maxAssetSize
              }
        });
    }
};
