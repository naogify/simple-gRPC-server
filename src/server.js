const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'greeter.proto');
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const greeterPackage = grpcObject.greeter;

function sayHello(call, callback) {
  callback(null, { message: `Hello, ${call.request.name}` });
}

function chat(call) {
  call.on('data', (chatMessage) => {
    console.log(`Received message from ${chatMessage.user}: ${chatMessage.message}`);
    // エコーとして同じメッセージをクライアントに送信
    call.write({ user: 'Server', message: `Echo: ${chatMessage.message}` });
  });

  call.on('end', () => {
    console.log('Chat ended');
    call.end();
  });
}

const server = new grpc.Server();
server.addService(greeterPackage.Greeter.service, {
  SayHello: sayHello,
  Chat: chat,
});

server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server running at http://localhost:50051');
});
