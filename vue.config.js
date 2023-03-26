const path = require('path');

module.exports = {
  transpileDependencies: true,
  chainWebpack: config => {
    // Configura o carregamento de fontes
    const rule = config.module.rule('fonts');
    rule.uses.clear();
    rule
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:8].[ext]'
          }
        }
      });
  },
  configureWebpack: {
    // Adiciona o diretório de fontes ao caminho de busca
    resolve: {
      alias: {
        fonts: path.resolve(__dirname, 'public/fonts/')
      }
    }
  }
}