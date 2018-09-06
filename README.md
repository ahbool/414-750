
### 概述

将设计稿为414px对应的rem值转换为更高清的750px对应的rem值。

1. 只会转换单位为**rem**的数值，单位为px的数值不会转换。

2. 转换前会自动将原文件备份至项目根目的 "*__backup*" 文件夹中。


&nbsp;


### 什么情况下需在用它？

将PSD设计稿重构成H5页面时，如果设计稿的宽是414px，那么我们会以屏幕宽414px为最大值来设置rem的相对值`fontSize`的值。

以414px为最大值已经过时了，大多是老项目在使用，现在大屏手机当道，在大于414px的手机上显示414px的内容会图片模糊、字体很小。

那么就需要将页面升级成750px，将414px升级成750px就需要将css中的相对于414的rem值转换成相对于750的rem值，修改量会很大，

此时就可以用这个工具来自动转换了。


&nbsp;


### 举例说明

比如以最大屏幕宽为414px时，对应的样式是
```
.div {
    margin-left:-0.2rem;
    padding: .5rem .15rem;
    border:1px solid #ccc;
    background: #fff;
}
```

使用此工具转换成750px为最大屏幕宽时，转换后的样式是
```
.div {
    margin-left:-.36232rem;
    padding: .9058rem .27174rem;
    border:1px solid #ccc;
    background: #fff;
}
```


&nbsp;

### 转换的文件

以下文件格式中的css样式会被转换
```
['.css', '.js', '.html', '.jsx', '.scss', '.vue', '.sass', '.less', '.asp', '.jsp', '.php', '.tmp', '.tmpl']
```



### 安装
```
npm install 414to750 -g
```



### 使用

在要转换的项目目录下面执行命令：
```
414to750 start
```



### 使用示例
如：项目路径为 `E:/Projects/MiniStore`

cmd中执行如下：


E:\Projects\MiniStore> *414to750 start*
