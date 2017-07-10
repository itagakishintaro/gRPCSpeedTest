# 必要な環境
Node.js

# 構成
* gRPCServer: gRPCで画像を返すサーバー
* RESTServer: RESTで画像を返すサーバー
* HTTPServer: gRPCServer、RESTServerから画像を取得し、HTMLを返すサーバー

# 起動
## gRPCServerの起動

```bash
cd gRPCServer
npm install
node grpc_server.js
```

## RESTServerの起動

```bash
cd RESTServer
npm install
node bin/www
```

## HTTPServerの起動

```bash
cd HTTPServer
npm install
node bin/www
```

# アクセス
http://localhost:3000
