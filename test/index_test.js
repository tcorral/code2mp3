'use strict';

var fs = require('fs');
var code2mp3 = require('../src');
var cwd = process.cwd();

exports.code2mp3 = {
  'test that it should return the same song of a single line of code': function (test) {
    code2mp3(cwd + '/test/fixtures/a.js', cwd + '/test/result/song_1', function () {
      var result = fs.readFileSync(cwd + '/test/result/song_1.mp3', 'utf8').length;
      test.ok(result > 0);
      test.done();
    });
  },
  'test that it should return the same song of a code file': function (test) {
    code2mp3(cwd + '/test/fixtures/file.js', cwd + '/test/result/song_2', function () {
      var result = fs.readFileSync(cwd + '/test/result/song_2.mp3', 'utf8').length;
      test.ok(result > 0);
      test.done();
    });
  }
};