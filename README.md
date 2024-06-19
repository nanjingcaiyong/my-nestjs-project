


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