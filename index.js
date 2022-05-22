const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let topMovies = [
  {
    title: "Once Upon a Time in Hollywood",
    director: "Quentin Tarantino"
  },
  {
    title: "The Hareful Eight",
    director: "Quentin Tarantino"
  },
  {
    title: "A Fistful of Dollars",
    director: "Sergio Leone"
  }
];

app.get('/', (req, res) => {
  res.send("Welcome to my Movie App.");
})

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
});  //need to revise this error handling middleware function

app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
