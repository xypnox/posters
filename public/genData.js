const sharp = require('sharp');

//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory
const directoryPath = path.join(__dirname, 'images');
//passsing directoryPath and callback function
const compress_images = require('compress-images');

let fileData = [];

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(function(file) {
    fileData.push(file);

    sharp('images/' + file)
      .resize({
        width: 600,
        fit: 'contain'
      })
      .toFile('resized/' + file)
      .then((err, info) => {
        compress_images(
          'resized/' + file,
          'compressed/',
          { compress_force: false, statistic: false, autoupdate: false },
          false,
          { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
          { png: { engine: 'pngquant', command: ['--quality=20-50'] } },
          { svg: { engine: 'svgo', command: '--multipass' } },
          {
            gif: {
              engine: 'gifsicle',
              command: ['--colors', '64', '--use-col=web']
            }
          },
          function(error, completed, statistic) {
            console.log('-------------');
            if (error) console.log(error);
            if (completed) console.log('Completed: ', completed);
            console.log(statistic);
            console.log('-------------');
          }
        );
      })
      .catch(err => {
        console.log('error: ', err);
      });
  });

  let jsonContent = JSON.stringify(fileData);

  fs.writeFile('../src/fileData.json', jsonContent, 'utf8', function(err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }
    console.log('JSON file has been saved.');
  });
});
