var fs = require('fs');
var path = require('path');
var audiosprite = require('audiosprite');
var clips = [];

module.exports = function (codeFilePath, songPath, callback) {
  var data = fs.readFileSync(codeFilePath, 'utf8');
  var chars = data.replace(/\r/g, '').replace(/\n/g, '').split('');
  var opts = { output: songPath, gap: -2, export: 'mp3' };
  chars.forEach(function (char){
    var file;
    var _path;
    var stats;
    try{
      file = char;
      _path = path.join(__dirname,  '..', 'sounds', file + '.mp3');
      stats = fs.statSync(_path);
      if(stats.isFile()){
        clips.push(_path);
      }
    } catch(er) {

    }
  });

  audiosprite(clips, opts, function(err, obj) {
    if (err) {
      callback(err);
      return console.error(err);
    }
    callback(null, obj);
    console.log('Done');
  });
};

