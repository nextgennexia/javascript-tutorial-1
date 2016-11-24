const
  express = require('express'),
  app = express();

app.listen(3333, () => {
  console.log('Application is listening on port 3333');
});


// Routes section //
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});
