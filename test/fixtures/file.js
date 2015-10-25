'use strict';

var fs = require('fs');
var code2mp3 = require('../src');
var cwd = process.cwd();

exports.code2mp3 = {
  'test that it should return the same song of a single line of code': function (test) {
    code2mp3(cwd + '/test/fixtures/a.js', 'test/result/song_1', function () {
      var expected = fs.readFileSync(__dirname + '/expected/song_1.mp3');
      var result = fs.readFileSync(__dirname + '/result/song_1.mp3');
      test.equal(result, expected);
      test.done();
    });
  },
  'test that it should return the same song of a code file': function (test) {
    code2mp3(cwd + '/test/fixtures/file.js', 'test/result/song_2', function () {
      var expected = fs.readFileSync(__dirname + '/expected/song_2.mp3');
      var result = fs.readFileSync(__dirname + '/result/song_2.mp3');
      test.equal(result, expected);
      test.done();
    });
  }
};