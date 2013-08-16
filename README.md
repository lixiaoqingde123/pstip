##pstip浮层

###安装
1. 安装nodejs环境
2. 安装edp <https://github.com/ecomfe/edp>
3. 安装clean-css

		npm install clean-css -g

	
###使用
压缩并合并js文件

	edp build -f
	
压缩css文件
	
	#压缩保障tip的css文件
	cleancss -o ./output/guarantee.css ./src/guarantee.css
	cleancss -o ./output/pstip.css ./src/pstip.css 
