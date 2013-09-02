pstip浮层
=========

安装
---------
1. 安装nodejs环境
2. 安装edp <https://github.com/ecomfe/edp>
3. 安装clean-css

		npm install clean-css -g

使用
---------
压缩并合并js文件

	edp build -f
	
注意
---------
1. 可以选择将文件压成一份或者将公共部分（tip.js, control.js）抽取出来，需修改`requrie引用路径`（tip路径或线上pstiplib路径）
2. 上线前需将js文件中的`css路径`改为线上
3. 涉及到图片时注意上线前需要将`图片路径`改为线上
