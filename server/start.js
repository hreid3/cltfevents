process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const https = require('https')
const fs = require('fs')
const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const compression = require('compression')
const favicon = require('serve-favicon')
const app = express()

// TODO: Inform devops when server crashes.
process.on('uncaughtException', (err) => {
    console.error({err}, '\n\nNode not exiting.\n\n')
})

app.locals.categoriesMap = {}

app.set('trust proxy', 1)
app.use(helmet(), compression(), session({
    secret: process.env.APP_SESSION_SECRET,
    name: 'sessionId',
    resave: false,
    saveUninitialized: false
}))

const proxy = require('express-http-proxy')
// app.all('/authenticate(*)', proxy(`${process.env.SSO_HOST}/authenticate`, {timeout: 5000 }))
// app.use('/api/v1/cms', require('./routes/cms'))
// app.use('/', require('./routes/admin'))

app.use(express.static(`${__dirname}/public/`))

app.use('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

// if (process.env.APP_ENV === 'local') {
//     https.createServer({
//         key: fs.readFileSync(`${__dirname}/certificates/key.pem`),
//         cert: fs.readFileSync(`${__dirname}/certificates/cert.pem`)
//     }, app).listen(process.env.APP_LISTEN_PORT, () => {
//         console.log(`VCPUI | Listening at https://localhost:${process.env.APP_LISTEN_PORT}. HTTPS required.`)
// })
// } else {
    app.listen(process.env.APP_LISTEN_PORT, () => {
        console.log(`${process.env.APP_DESCRIPTION} Listening on port ${process.env.APP_LISTEN_PORT}`)
})
// }
 