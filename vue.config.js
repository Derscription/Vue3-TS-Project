// const path = require("path")
const Components = require("unplugin-vue-components/webpack")
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers")

module.exports = {
  // 1.配置方式一: CLI提供的属性
  outputDir: "./build",
  // publicPath: "./", // 部署到服务器时不要添加这个配置
  devServer: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:5000",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
  },
  // 2.配置方式二: 和webpack属性完全一致, 最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components"
      }
    },
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     "@": path.resolve(__dirname, "src"),
  //     components: "@/components"
  //   }
  // }
  // 3.配置方式三:
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set("@", path.resolve(__dirname, "src"))
  //     .set("components", "@/components")
  // }
}
