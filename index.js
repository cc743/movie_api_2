const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

let users = [
  {
    name: "Rob Caracol", 
    favoriteMovies: [],
    id: 1
  },
  {
    name: "Bobby Fish", 
    favoriteMovies: ["A Fistful of Dollars", "The Hateful Eight"],
    id: 2
  }
];

let topMovies = [
  {
    title: "Once Upon a Time in Hollywood",
    director: {
      Name: 'Quentin Tarantino', 
      Description: 'He is an American Filmmaker'
    }, 
    Genre: {
      Name: 'Comedy-Drama', 
      Description: 'Elements of Comedy and Drama'
    }
  },
  {
    title: "The Hateful Eight",
    director: {
      Name: 'Quentin Tarantino', 
      Description: 'He is an American Filmmaker'
    }, 
    Genre: {
      Name: 'Western', 
      Description: 'Set in the American West'
    }
  },
  {
    title: "A Fistful of Dollars",
    director: {
      Name: 'Sergio Leone', 
      Description: 'He was an Italian Filmmaker'
    }, 
    Genre: {
      Name: 'Western', 
      Description: 'Set in the American West'
    }
  }
];

app.get('/', (req, res) => {
  res.send("Welcome to my Movie App.");
})

//CREATE A NEW USER
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('new user must include a name');
  }
});

//UPDATE AN EXISTING USER
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id)
  if (user) {
    user.name = updatedUser.name;
    res.status(201).json(user);
  } else {
    res.status(400).send("No such user ID found");
  }
})

//CREATE - allow a user to post a movie to their list of favorites
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to ${id}'s list of favorites`);
  } else {
    res.status(400).send("No such user id or title found");
  }
})

//DELETE - allow a user to delete a movie from their list of favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from ${id}'s list of favorites`);
    //res.status(201).json(user);
  } else {
    res.status(400).send("No such user id or title found");
  }
})

//DELETE - allow a user to de-register from the website
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`User ${id} has been de-registered`);
    //res.status(201).json(users);
  } else {
    res.status(400).send("No such User");
  }
})

//READ 
app.get('/movies', (req, res) => {
  res.status(200).json(topMovies);
});

//READ
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = topMovies.find(movie => movie.title === title);  

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('No such movie was found');
  }
});

//READ GERNE INFORMATION BY GENRE NAME (i.e. comedy-drama, western, etc.)
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const movie = topMovies.find(movie => movie.Genre.Name === genreName).Genre;  

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('No such genre was found');
  }
});

//READ DIRECTOR INFORMATION BY DIRECTOR NAME 
app.get('/movies/director/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = topMovies.find(movie => movie.director.Name === directorName).director;  

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('No such genre was found');
  }
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
});  //need to revise this error handling middleware function

app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
