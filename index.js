#!/usr/bin/env node

const Convert = require('./convert')
const pkg = require('./package.json')

var args = process.argv.splice(2);

switch(args[0]){
    case 'start':
        new Convert().start('.')
        break

    case '-v':
        console.log(pkg.version)
        break

    default:
        console.log('说明：请在要转换的项目根目录下执行 "414to750 start"')
        break
}
