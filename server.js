const
  express = require('express'),
  app = express(),
  dbRoute = __dirname + '/db';

app.listen(3333, () => {
  console.log('Application is listening on port 3333');
});


// Routes section //
app
  .get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  })
  .get('/db/window-still', (req, res) => {
    res.sendFile(dbRoute + '/windowStill');
  });
