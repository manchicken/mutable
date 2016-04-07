'use strict'

const Koa = require( 'koa' )
const Config = require( 'config' )

var app = Koa()

app.use( function *() {
    this.body = 'Hello world'
})

app.listen( config.get( 'server.port' ) )
