var express = require('express');
var router = express.Router();

const QRCode = require('qrcode');
const Jimp = require("jimp");
const fs = require('fs')
const qrCodeReader = require('qrcode-reader');

router.get('/', function (req, res, next) {
  // QRCode.toFile('./public/images/file.png', 'Hola Mundo', {
  //   errorCorrectionLevel: 'H'
  // }, function (err) {
  //   if (err) throw err;
  //   console.log('QR code saved!');
  // });

  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/test', function (req, res, next) {
  // __ Read the image and create a buffer __ \\
  const buffer = fs.readFileSync('./public/images/file.png');

  // __ Parse the image using Jimp.read() __ \\
  Jimp.read(buffer, function (err, image) {
    if (err) {
      console.error(err);
    }
    // __ Creating an instance of qrcode-reader __ \\

    const qrCodeInstance = new qrCodeReader();

    qrCodeInstance.callback = function (err, value) {
      if (err) {
        console.error(err);
      }
      // __ Printing the decrypted value __ \\
      console.log(value.result);
    };

    // __ Decoding the QR code __ \\
    qrCodeInstance.decode(image.bitmap);
  });
});

module.exports = router;
