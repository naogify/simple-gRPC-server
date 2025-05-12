# simple-gRPC-server

gRPC サーバーの簡単な実装例です。
gRPC の基本的な使い方を学ぶためのサンプルコードです。


## 構成

```
├── package.json
├── README.md
└── src
    ├── greeter.proto // gRPC のプロトコル定義ファイル
    └── server.js // gRPC サーバーの実装
```

## サーバーの実行

### 環境構築

```bash
npm install
npm start
```

### 動作確認
```bash
grpcurl -plaintext -d '{"name": "Taro"}' localhost:50051 helloworld.Greeter/SayHello

```

- `grpcurl` がインストールされていない場合は、`brew install grpcurl` でインストールできます。


## 解説

- `greeter.proto` で gRPC のプロトコルを定義しています。

```
syntax = "proto3"; // gRPC のプロトコルバージョン

package helloworld; // パッケージ名

// Greeter API の定義
service Greeter {
  // この API で使用できるエンドポイント（関数）を定義
  rpc SayHello (HelloRequest) returns (HelloReply);
}

// リクエストメッセージの定義
message HelloRequest {
  string name = 1;
}

// レスポンスメッセージの定義
message HelloReply {
  string message = 1;
}
```

## その他
- `gRPC` は HTTP/2 を使用。
- バイナリ形式（Protobuf）でデータを送受信。
- バイナリデータのデコードのために、`.proto` ファイルで、リクエスト/レスポンス、呼び出すエンドポイント（関数）を定義。
- HTTPメソッドは `POST` のみ。
- リクエストパス（例: `/helloworld.Greeter/SayHello`）で呼び出す関数を指定。
- リクエストボディに、リクエストパラメターを保持。


## 注意事項
