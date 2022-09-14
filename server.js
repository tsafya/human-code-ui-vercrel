const express = require('express');
const path = require('path');
const app = express();
const locales = ['he', 'it'];
app.use(express.static(__dirname + '/dist/human-code'));
locales.forEach((locale) => {
  app.get(`/${locale}/*`, (req, res) => {
    res.sendFile(
      // path.join(__dirname + '/dist/human-code/'+ locale + '/index.html')
      path.resolve(__dirname + '/dist/human-code/', locale, 'index.html')
    );
  });
});
// app.get('/*', function(req,res) {
//   res.sendFile(path.join(__dirname+
//     '/dist/human-code/he/index.html'));});
app.listen(process.env.PORT || 8080);
