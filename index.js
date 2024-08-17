import express from 'express';
const app = express();
import http from 'http';
import mongoose from 'mongoose';
import blogRouter from './routes/blog.route.js';
import config from './config/config.js';

mongoose.connect(config.dbUri)
.then(()=> {
    console.log('connected to mongodb');
}).catch((err)=> {
    console.log(err);
});

app.use(express.json());
app.use(blogRouter)

const server = http.createServer(app);
server.listen(config.port, ()=> {
    console.log('server listening on port 3000');
})

