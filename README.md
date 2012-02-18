# README

- Twitter の CLI Client 向けに書いた（[colors](https://github.com/Marak/colors.js) だとやりたい事出来なかったので）。
- String.prototype は弄ってない。

- - -

## 使用例

	var colorize = require('ANSIColor').colorize;
	
	String.prototype.colorize = function() {
	  return colorize.bind(this)(this);
	};
	
	console.log('%s',
	  "@hnagato https://github.com/hnagato a sample tweet. #test"
	    .colorize()
	    .apply(/@[a-zA-Z0-9_]+/)
	    .apply(/#\S+/)
	    .blue().underline().apply(/https:\/\/\S+/));


![result](https://github.com/hnagato/node-ansi-color/raw/master/img/ss.png)

