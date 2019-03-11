#!/usr/bin/env node
const dev = require('../src/dev')
const task = process.argv.slice(2)[0] || 'dev'

;(async () => {
  switch(task) {
  case 'dev':
    await dev()
    break
  default:
    throw new Error('Unknown option. Only `dev` is supported.')
  }
})()
