const webpack = require('webpack');
const path = require('path');

const dist = path.resolve(__dirname, './dist');
const src = path.resolve(__dirname, './src');
const views = path.resolve(__dirname, './views');
const node_modules = path.resolve(__dirname, './node_modules');

 //引入html模板
const HtmlWebpackPlugin  = require('html-webpack-plugin');
//拷贝资源
const CopyWebpackPlugin = require('copy-webpack-plugin');




function getEntries (){
  let entries = {};
  entries['main'] = path.join(src, 'main.js');
  return entries;
}

module.exports = {
  // 输入
  entry: getEntries(),
  // 解析
  resolve: {
    alias: {
      '@': src,
      utils: path.join(src, 'utils'),
    },
    // extensions: ['js', 'jsx', 'json'],
  },
  externals: {
    // "jquery": "jQuery",
    // 'videojs': 'videojs',
    // "swiper": "Swiper",
  },
  // 提取公共模块 optimization
  optimization: {
    splitChunks: {
      /*
          all  异步和同步都可以共享
          async 表示对动态（异步）导入的模块进行分离。
          initial 表示对初始化值进行分离优化。
      */
      chunks: 'async',
      // name: 'jquery',   //打包后的名字
      //神奇的true值将会自动根据切割之前的代码块和缓存组键值(key)自动分配命名,否则就需要传入一个String或者function.
      // 命名与入口名称相同时,入口将会被移除.
      name: true,
      minSize: 30000,  //(默认是30000)：新产出的vendor-chunk的大小要大于30kb

      //（默认是1）：在分割之前，这个代码块最小应该被引用的次数
      //（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
      minChunks: 2, //共同引用超过大于等于2次就可以分割成公共模块
      maxAsyncRequests: 5,    //（默认是5）：并行请求vendor-chunk的数量不能超出5个
      maxInitialRequests: 3,  //（默认是3）：对于entry-chunk,并行加载的vendor-chunk不能超出3个
      //  此选项允许您指定用于生成名称的分隔符 默认以~分割
      automaticNameDelimiter: '~',

      // 下面是缓存组的配置
      //缓存组会继承splitChunks的配置，
      //但是test、priorty和reuseExistingChunk只能用于配置缓存组。
      //可以通过optimization.splitChunks.cacheGroups.default: false禁用default缓存组
      cacheGroups: {

        // default: {  // 默认缓存组的配置（false 来禁用 默认缓存组）
        //   minChunks: 2,
        //   //定义缓存组的优先级 更高优先级的缓存组可以优先打包所选择的模块）（默认自定义缓存组优先级为0）
        //   priority: -20,
        //   //选项允许复用已经存在的代码块，而不是新建一个新的，需要在精确匹配到对应模块时候才会生效。
        //   reuseExistingChunk: true,
        // },

        // 提取node_modules下依赖 为 vendor.js
        // vendors: {
        //   //选项用于控制哪些模块被这个缓存组匹配到 默认所有模块
        //   // 值得类型RegExp、String和Function
        //   // test: /node_modules\//,
        //   test: /[\\/]node_modules[\\/]/, // 这里选的是node_modules中的模块
        //   // name: 'vendor',
        //   priority: -10, //定义缓存组的优先级
        //   // ...groupsOptions,
        // },

        vendor: {
          test: /(node_modules|vendors).+(?<!s?css)$/,
          // test: /[\\/]node_modules[\\/]/,
          // test: /node_modules\/(.*).js/,
          // test: (m) => {
          //   const name = module.nameForCondition();
          //   return /(node_modules|vendors)/.test(name) && !(/\.css$/.test(name)),
          // },
          name: 'vendor',
          chunks: 'all',
          priority: 10,
          // enforce: true,
        },
        commons: {
          name: "commons",
          chunks: "all", 
          minChunks: 2,
          priority: 0,
          minSize:0,
        },

        // 将css提取到一个文件中
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          priority: -10,
          enforce: true,
        },


      }
    },
    // runtimeChunk: {
      // name: 'manifest',
    // },
    runtimeChunk: true,
    // noEmitOnErrors : true, // 在编译出错时，使用 optimization.noEmitOnErrors 来跳过生成阶段(emitting phase)。   
    // nodeEnv: "production", // 告知 webpack 将 process.env.NODE_ENV 设置为一个给定字符串。如果 optimization.nodeEnv 不是 false，则会使用 DefinePlugin，optimization.nodeEnv 默认值取决于 mode，如果为 falsy 值，则会回退到 "production"。
    // //parent chunk中解决了的chunk会被删除
    // removeAvailableModules:true,
    // //删除空的chunks
    // removeEmptyChunks:true,
    // //合并重复的chunk
    // mergeDuplicateChunks:true,
  },
  // loader
  module: {
    rules: [
      // js
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules)/,
      },
      // eslint
      {
        test: /\.jsx?$/,
        use: ['eslint-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules)/,
      },
      // 图片文件处理
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/i,
        // test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/i,
        // test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // name 同flie-loader
              name: 'assets/images/[name]-[hash:5].[ext]',
              // name: 'assets/images/[path]-[name]-[hash:5].[ext]',
              // 小于10000字节的转换为DataUrl格式(base64)
              limit: 10000,
              // outputPath: 'assets/images/',
              // 是否采用file-loader， 默认采用
              // 还可以用responsive-loader等一些其他loader
              fallback: 'file-loader',
              // 设置要处理的MIME类型，
              mimetype:'image/png',
            }
          },
          {
            loader: 'image-webpack-loader', //压缩图片
            options: {
              disable: false, //是否禁止压缩，默认false
              quality: 80, //压缩质量，也可以是'70-80'
            }
          }
        ]
      },

      // html模板文件处理
      {
        test: /\.html$/,
        include: path.join(__dirname, 'src'),
        use: [{
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }]
      },



    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(views, 'index.ejs'),
      // filename: 'index.html',
      // favicon: path.resolve(__dirname, 'public/static/favic.ico'),
      title: '知群 - 专业是一种力量',
      // chunks: ['main', 'manifest', 'vendor'], //包含的chunks
      // excludeChunks: ['b', 'c'], //排除的chunks
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './public'),
      }
    ], {
    	ignore: [
    		'node_modules/'
    	]
    }),

  ]
}

