'use strict'
const express = require('express')
const Slapp = require('slapp')
const BeepBoopConvoStore = require('slapp-convo-beepboop')
const BeepBoopContext = require('slapp-context-beepboop')
if (!process.env.PORT) throw Error('PORT missing but required')

var slapp = Slapp({
  convo_store: BeepBoopConvoStore(),
  context: BeepBoopContext()
})

var app = slapp.attachToExpress(express())

slapp.message('hi (.*)', ['direct_mention'], (msg, text, match) => {
  msg.say('how are you?').route('handleHowAreYou', { what: match })
})

slapp.route('handleHowAreYou', (msg, state) => {
  msg.say(':smile: ' + state.match)
})

app.get('/', function (req, res) {
  res.send('Hello')
})

console.log('Listening on :' + process.env.PORT)
app.listen(process.env.PORT)
