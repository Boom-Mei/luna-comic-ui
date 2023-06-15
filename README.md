# comics

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 原地址
See [Amor丶強 / 哔哩哔哩漫画](https://gitee.com/second-xiao-qiang/bili-bili-cartoon?_from=gitee_search)


### 部署
```
npm run build
```
nginx.conf
```
server {
    listen       80;
    server_name  bilibili.luna.com;

    root D:\shouhou\manhua\luna-comics\dist;
    index index.php index.htm index.html;

    location / {
        # 解决刷新后出现404的问题
        try_files $uri $uri/ /index.html;
    }

    location /api {
        # 将/api的请求转发到后端服务地址
        # /api是在.env.production中配置的
        proxy_pass http://jiajie.com;
    }
}
```