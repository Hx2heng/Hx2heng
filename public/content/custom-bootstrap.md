
### 使用自定义的Bootstrap？
bootstrap官网提供自定义版本的下载，用户只要选择需要的组件就能下载对应的版本。但是，这种做法实在是太繁琐了。而且如果我们想要方便选择所需组件，又想通过sass/less修改bootstrap，要通过什么方式？答案就是'bootstrap-loader'（这个是对应修改sass的，本文只讲sass，还有个对应less的，叫'bootstrap-webpack'）。

### bootstrap-loader的使用
bootstrap-loader ，从名字上看得出他是一个加载器，配合webpack使用的。它能使页面引用到自定义版本的bootstrap。

###1.安装
	
安装'bootstrap-loader'

	npm install bootstrap-loader

安装所需依赖：

	npm install --save-dev bootstrap-sass
	npm install --save-dev css-loader node-sass resolve-url-loader sass-loader style-loader url-loader

你有可能还需要安装：

	npm install --save-dev imports-loader exports-loader
	npm install --save-dev postcss-loader		
 
###2.使用
1.简单使用方法：

	import 'bootstrap-loader'

此时会引用到完整的bootstrap。

注：bootstrap引用了诸如svg、ttf等文件，所以也需要在webpack.config.js配置好对应的加载器：

    { test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
    { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
    {
    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'url-loader?limit=10000',
    },
    {
    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
    use: 'file-loader',
    }

2.可自定义版：

首先在入口文件前面加载'bootstrap-loader'（此时不用在index.js里写`import 'bootstrap-loader'`）:

	entry: {
        index: ['bootstrap-loader', './index.js'],//webpack数组形式入口文件以数组最后一个作为出口文件
        test: './test.js',
    },

然后在根目录添加.bootstraprc文件，即是bootstrap自定义配置文件，文件可以用yml或者json格式编写自定义属性，完整案例(yml格式)：
  

    bootstrapVersion: 3
    
    useCustomIconFontPath: false
    
    styleLoaders:
      - style
      - css
      - sass
    
    extractStyles: false
    
    styles:
    
      # Mixins
      mixins: true
    
      # Reset and dependencies
      normalize: true
      print: true
      glyphicons: true
    
      # Core CSS
      scaffolding: true
      type: true
      code: true
      grid: true
      tables: true
      forms: true
      buttons: true
    
      # Components
      component-animations: true
      dropdowns: true
      button-groups: true
      input-groups: true
      navs: true
      navbar: true
      breadcrumbs: true
      pagination: true
      pager: true
      labels: true
      badges: true
      jumbotron: true
      thumbnails: true
      alerts: true
      progress-bars: true
      media: true
      list-group: true
      panels: true
      wells: true
      responsive-embed: true
      close: true
    
      # Components w/ JavaScript
      modals: true
      tooltip: true
      popovers: true
      carousel: true
    
      # Utility classes
      utilities: true
      responsive-utilities: true
    
    ### Bootstrap scripts
    scripts:
      transition: true
      alert: true
      button: true
      carousel: true
      collapse: true
      dropdown: true
      modal: true
      tooltip: true
      popover: true
      scrollspy: true
      tab: true
      affix: true

如果想给不同页面配置不用的.bootstraprc文件或者不想把.bootstraprc文件放在根目录，可以修改入口文件的bootstrap-loader的后缀，

格式：**`bootstrap-loader/lib/bootstrap.loader?configFilePath=[文件位置]/[文件名字].[文件类型]!bootstrap-loader/no-op.js`**

eg:

	entry: {
        index: [`bootstrap-loader/lib/bootstrap.loader?configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`, './index.js'],
        test: './test.js',
    }

而自定义样式需要在.bootstraprc添加配置(按需要设置，不设置注释就可以):
	
	//在Bootstrap variables之前加载
	preBootstrapCustomizations: ../public/css/bootstrap/pre-customizations.scss

	//在Bootstrap variables之后bootstrap之前加载
	bootstrapCustomizations: ../public/css/bootstrap/customizations.scss

	//在bootstrap之后加载
	appStyles: ../public/css/bootstrap/app.scss

【附[bootstrap 样式变量表](http://v3.bootcss.com/customize/#less-variables)】

bootstrap-loader的官方源码：[https://github.com/shakacode/bootstrap-loader](https://github.com/shakacode/bootstrap-loader)，上面会有更多解决方案。