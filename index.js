const axios = require('axios')
const express = require('express')

const app = express()
let helloService = null;

app.get("/wassup", async (req,res)=>{

    try {
        const response = await axios.get('http://metadata.google.internal/computeMetadata/v1/project/attributes/hello-service')
        const ip = response.data;
        helloService = ip;

        const reponse2 = await axios.get(`http://${helloService}:3000/hello`)
        const data = response.data;
        res.send("Sucessfully got the data"+data)
    } catch (error) {
        res.send('unable to to reach meta-data server')
    }

})


app.listen(3000,()=>console.log('App Started'))