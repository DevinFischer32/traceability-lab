const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'dd5e2edd25464362993ae2531bdcde42',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()
const usernames = []
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('Html loaded')
})

app.post('/api/username', (req, res)=>{
    let {username} = req.body
    username = username.trim()

    const index = usernames.findIndex(userName=> userName === username)

    if(index === -1 && username !== ''){
        usernames.push(username)
        rollbar.log('username added successfully', {author: 'Devin', type: 'manual entry'})
        res.status(200).send(usernames)
    } else if (username === ''){
        rollbar.error('No username given')
        res.status(400).send('must provide a username.')
    } else {
        rollbar.error('username already exists')
        res.status(400).send('that username already exists')
    }

})


const port = process.env.PORT || 4545

app.listen(port, ()=> console.log(`Transcribing on port ${port}!`))