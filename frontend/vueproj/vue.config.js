/** proxy를 사용하지 않으면 CORS에 의해서 막힐 수 있음 */
const { VUE_APP_SERVER } = process.env;

module.exports = {
  devServer: {
    proxy: {
      "/serverApi": {
        target: VUE_APP_SERVER,
        changeOrigin: true,
        pathRewrite: {
          "^/serverApi": "",
        },
      },
    },
  },
};
