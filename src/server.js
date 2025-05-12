// server.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const PROTO_PATH = path.join(__dirname, 'greeter.proto');

// .proto ファイルをロード
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// 実装
const greeter = {
  SayHello: (call, callback) => {
    console.log('Request data:', call.request);
    const name = call.request.name;
    callback(null, { message: `Hello, ${name}` });
  },
};

// サーバー起動
const server = new grpc.Server();

// Greeter サービスを登録
server.addService(proto.Greeter.service, greeter);

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(`Failed to bind server: ${err.message}`);
    return;
  }
  console.log(`gRPC server running at http://0.0.0.0:${port}`);
});
