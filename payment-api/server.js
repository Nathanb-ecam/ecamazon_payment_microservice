var express = require('express');
let app = express();
// const PORT = process.env.NODE_PORT |80
const PORT = process.env.API_PORT | 3000;

let cors = require('cors');
// app.use(express.urlencoded())
app.use(express.json());


const corsOptions = {
    origin: '*', // specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}
app.use(cors(corsOptions));




let routes = require('./routes');
app.use('/api',routes);



app.listen(PORT,()=>{
    console.log("")
    console.log("API démarrée sur le port "+PORT)
    console.log("")
})