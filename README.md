# charge_management

## 文档结构

```
webapp-
	cfg-  //webpack各种配置目录
		base.js //webpack基础配置
		defaults.js //webpack配置常量
		dev.js //webpack dev配置
		dist.js //webpack 编译配置
	dist- //最终编译的目录
		assets/  //包括了编译后的css、js
		index.html  //编译后的spa的入口页面
	src-  //代码目录
		common 通用工具目录
		components //Dumb/Presentational Components目录
		constants //常量目录
		images //图片目录
		index.html //WebpackDevServer启动时候的页面
		index.js //程序入口，在cfg/dev.js中entry中定义了index bundle引用这个文件
		index_dist.html //编译的页面，最终这个页面会被编译生成dist/index.html
	.babelrc //babel配置文件
	.eslintrc //eslint配置文件
	.gitignore //git ignore文件
	build.sh //执行编译的入口shell
	karma.conf.js //karma配置文件
	package.json //不解释
	README.md //你现在阅读的文字都放在这个文件中
	server.js //启动WebpackDevServer服务
	webpackconfig.js //webpack配置文件
    .flowconfig //flow config
```


###安装yarn
进入项目文件目录内执行yarn start命令（在这之前确保你已经安装成功了依赖包，否则执行yarn install或者npm install）我会把依赖包一起打包发过去

###用例输入
此次的输入在输入框中进行，无论 执行预约订单操作还是取消操作，都要保证格式统一，如下：
x999 2018-03-02 12:00~13:00 X

###测试用例
X999 2018-02-03 08:00~15:00 X
X998 2018-02-03 08:00~13:00 X
X997 2018-02-03 08:00~15:00 N
X999 2018-02-03 16:00~17:00 X
X919 2018-02-08 08:00~15:00 X
X999 2018-04-01 08:00~15:00 X