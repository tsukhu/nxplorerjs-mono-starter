var TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ['./src/index.ts'];

    config.resolve = {
      extensions: ['.ts', '.js', '.json']
    };

    config.module.rules.push({
      test: /\.ts$/,
      exclude: /(node_modules)/,
      loader: 'awesome-typescript-loader'
    });

    config.plugins.splice(1, 1); // remove the BannerPlugin

    if (options.env === 'production') {
      config.plugins = [
        ...config.plugins,
        new TypedocWebpackPlugin(
          {
            out: './docs',
            target: 'es6',
            module: 'commonjs',
            moduleResolution: 'node',
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            exclude: '**/node_modules/**/*.*',
            excludeExternals: true,
            includeDeclarations: false,
            ignoreCompilerErrors: true,
            excludePrivate: true,
            sourceMap: true,
            skipLibCheck: true,
            lib: ['lib.esnext.full.d.ts', 'lib.esnext.asynciterable.d.ts']
          },
          ['./src']
        )
      ];
    }

    return config;
  }
};
