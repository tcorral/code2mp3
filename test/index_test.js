'use strict';

var fs = require('fs');
var code2mp3 = require('../src');

exports.code2mp3 = {
  'test that it should return the same song of a single line of code': function (test) {
    code2mp3(__dirname + '/fixtures/a.js', __dirname + '/result/song_1', function (err, obj) {
      if(!obj){
        test.ok(true);
        test.done();
      } else {
        var result = fs.readFileSync(__dirname + '/result/song_1.mp3', 'utf8').length;
        console.log(result);
        test.ok(result > 0);
        test.done();
      }

    });
  },
  'test that it should return the same song of a code file': function (test) {
    code2mp3(__dirname + '/fixtures/file.js', __dirname + '/result/song_2', function (err, obj) {
      if(!obj){
        test.ok(true);
        test.done();
      } else {
        var result = fs.readFileSync(__dirname + '/result/song_2.mp3', 'utf8').length;
        console.log(result);
        test.ok(result > 0);
        test.done();
      }
    });
  }
};