const express = require('express')
const app = express()
const port = 3000
const hostname = '127.0.0.1'



//running a server
app.listen(port,hostname, () => {
        console.log(`server çalışıyor, http://${hostname}:${port}/`)
     })
    