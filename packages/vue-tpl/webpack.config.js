const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const SpritesmithPlugin = require("webpack-spritesmith");
module.exports = {
  mode: "development",
  devtool: 'eval-source-map',
  resolve: {
    modules: ["node_modules", "assets/generated"]
  },
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        enforce: "pre",
        options: {
          formatter: require("eslint-friendly-formatter")
        },
        loader: "eslint-loader",
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }, {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("postcss-preset-env")()]
            }
          },
          'less-loader'
        ], // compiles Less to CSS
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "img/[hash:7].[ext]"
            }
          }
        ]
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "media/[hash:7].[ext]"
            }
          }
        ]
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "font/[hash:7].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    // 将其它规则复制并应用到 .vue 文件里相应语言的块中。
    // 例如，如果我们有一条匹配 /.js\$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "项目模板"
    }),
    new StyleLintPlugin({
      files: ["src/**/*.{vue,css,scss,sass}"]
    }),
    // src 用来指定哪些图片需要合并成雪碧图。cwd 表示原始图片所在的目录，glob 是一个匹配规则，只有符合 glob 规则的图片才需要合并。
    // target 用来指定文件的输出。image 指定将生成的雪碧图放在何处。css 指定生成的样式文件应该放在何处。
    // apiOptions 中的 cssImageRef 是一个雪碧图的路径，CSS 文件中将使用该路径用作背景图。例如 .ico{background-image: url(~sprite.png)}。
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, "src/assets/sprites"),
        glob: "*.png"
      },
      target: {
        image: path.resolve(__dirname, "src/assets/generated/sprite.png"),
        css: path.resolve(__dirname, "src/assets/generated/sprite.scss"),
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    proxy: {
      "/api": "http://localhost:8081"
    }
  }
}