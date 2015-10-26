'use strict';

var fs = require('fs');
var code2mp3 = require('../src');

var tests = {
  'test that it should return the same song of a single line of code': function(test) {
    code2mp3(__dirname + '/fixtures/file.js', __dirname + '/result/song_1', function(err, obj) {
      if(err){
        test.ok(false);
        return test.done();
      }
      var obj1 = JSON.parse(fs.readFileSync(__dirname + '/expected/song_1.json', 'utf8'));
      var spriteMap = JSON.stringify(obj.spritemap);
      var spriteMap1 = JSON.stringify(obj1.spritemap);
      var expected = fs.readFileSync(__dirname + '/expected/song_1.mp3', 'utf8').length;
      var result = fs.readFileSync(__dirname + '/result/song_1.mp3', 'utf8').length;
      test.equal(result, expected);
      test.equal(spriteMap, spriteMap1);
      test.done();
    });
  },
  'test that it should return the same song of a code file': function(test) {
    code2mp3(__dirname + '/fixtures/file.js', __dirname + '/result/song_2', function(err, obj) {
      if(err){
        test.ok(false);
        return test.done();
      }
      var obj1 = JSON.parse(fs.readFileSync(__dirname + '/expected/song_2.json', 'utf8'));
      var spriteMap = JSON.stringify(obj.spritemap);
      var spriteMap1 = JSON.stringify(obj1.spritemap);
      var expected = fs.readFileSync(__dirname + '/expected/song_2.mp3', 'utf8').length;
      var result = fs.readFileSync(__dirname + '/result/song_2.mp3', 'utf8').length;
      test.equal(result, expected);
      test.equal(spriteMap, spriteMap1);
      test.done();
    });
  }
};

exports.code2mp3  = process.cwd().indexOf('travis') !== -1 ? {} : tests;