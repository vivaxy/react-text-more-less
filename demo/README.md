
demo

Initialized by [vivaxy/gt-front-end-scaffold](https://github.com/vivaxy/gt-front-end-scaffold)

## Initialization

`yarn install`

## Development

`yarn run dev`

## Build

`yarn run build`

basic configuration files for front end projects

```
├── dist              # 可执行代码目录，需要加入 .gitignore
│   ├── css           # css 输出文件
│   ├── html          # html 输出文件
│   └── js            # js 输出文件
├── node_modules      # node 依赖，需要加入 .gitignore
├── scripts           # 工具
│   ├── config.js     # wepback 配置
│   └── dev.js        # webpack 本地调试服务
├── src               # 源码目录
│   ├── ejs           # 模版文件
│   ├── entries       # js 入口文件，每个入口都会生成一个对应的 html
│   ├── lib           # js 基础库
│   ├── styles        # 样式源文件 postcss
│   └── templates     # html 模版文件
├── .babelrc          # babel 配置
├── .editorconfig     # editorconfig 配置文件
├── .gitignore        # git 忽略文件
├── CHANGELOG.md      # 改动日志
├── LICENSE           # 开源许可证
├── package.json      # node 配置文件
├── README.md         # 说明文档
├── webpack.config.js # webpack 配置文件
└── yarn.lock         # yarn 版本锁
```
