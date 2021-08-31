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
    try{
        res.sendFile(path.join(__dirname, '/public/index.html'))
        rollbar.info('Html loaded')
    }catch (err){
        rollbar.critical(err)
    }
})

app.get('/js',(req,res)=>{
    try{
        nonExistentFunction()
    }catch(err){
        alert(err)
        rollbar.warning('js error')
    }
})

const usernames = []
app.post('/api/username', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = usernames.findIndex(usernameName => usernameName === name)

    if(index === -1 && name !== ''){
        usernames.push(name)
        rollbar.log('Username added successfully', {author: 'Devin', type: 'manual entry'})
        res.status(200).send(usernames)
    } else if (name === ''){
        rollbar.error('No username given')
        res.status(400).send('must provide a username.')
    } else {
        rollbar.error('username already exists')
        res.status(400).send('that username already exists')
    }

})


const port = process.env.PORT || 5501

app.use(rollbar.errorHandler())
app.listen(port, ()=> console.log(`Transcribing on port ${port}!`))