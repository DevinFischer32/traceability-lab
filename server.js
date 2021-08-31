const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'dd5e2edd25464362993ae2531bdcde42',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('Html loaded')
})

const port = process.env.PORT || 4545

app.listen(port, ()=> console.log(`Transcribing on port ${port}!`))