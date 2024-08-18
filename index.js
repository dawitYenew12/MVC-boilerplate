import http from 'http';
import mongoose from 'mongoose';
import config from './config/config.js';
import app from './server.js';

mongoose.connect(config.dbUri)
.then(()=> {
    console.log('connected to mongodb');
}).catch((err)=> {
    console.log(err);
});

const httpServer = http.createServer(app);
const server = httpServer.listen(config.port, ()=> {
    console.log('server listening on port 3000');
})


function exitHandler() {
    if (server) {
        server.close(() => {
            console.log('server closed');
            process.exit(1);
        })  
    } else {
        process.exit(1);
    }
}
function unExpectedErrorHandler(error) {
    console.log(error);
    exitHandler();
}
process.on('uncaughtException', unExpectedErrorHandler);
process.on('unhandledRejection', unExpectedErrorHandler);
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});
