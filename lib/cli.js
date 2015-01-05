#!/usr/bin/env node

var Optimizer = require('./optimizer'),
    path = require('path');

module.exports = function(program) {

    var target = program.args[0];

    if (program.dst) {
        console.log('  - dst', program.dst);
    }

    if (program.settings) {
        if (program.settings.indexOf('http') !== 0) {
            program.settings = path.resolve(process.cwd() + '/', program.settings);
        }
        console.log('  - settings', program.settings);
    }


    var config = {};
    config.src = path.resolve(process.cwd() + '/', target);
    config.dst = path.resolve(process.cwd() + '/', program.dst);
    config.settings = program.settings || {};

    new Optimizer(config);

};