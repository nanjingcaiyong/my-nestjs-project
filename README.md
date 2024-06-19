


## 发布

### 构建

```sh
npm run build
```

### 启动

```sh
# 启动测试环境
pm2 restart ecosystem.config.js --env sit

# 启动验收环境
pm2 restart ecosystem.config.js --env pre

# 启动生产环境
pm2 restart ecosystem.config.js --env prod
```

##

### nest-cli.json

```json
{
  collection: "", // 指定使用的默认 Schematics 集合。Schematics 是用于生成文件的模板。
  monorepo: "", // 指示是否在一个单一的仓库（monorepo）中管理多个项目
  sourceRoot: "", // 指定源码目录
  entryFile: "", // 指定入口文件的名字，默认是 main
  compilerOptions: {
    deleteOutDir: "", // 在编译前删除输出目录（通常是 dist）
    sourceRoot: "", // 指定源代码的根目录
    tsConfigPath: "", // 指向 tsconfig 文件的路径
    assets: "", // 指定需要在构建时一同复制到输出目录的静态资源或文件夹,
    watchAssets: "", // 在使用 --watch 标志时，监视 assets 中指定的静态资源的变化
  }
}
```