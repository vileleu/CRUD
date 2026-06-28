const	express = require("express");

const	mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
	.then(() => console.log("MongoDB OK"))
	.catch((err) => console.log("MongoDB KO", err));

const	app = express();
app.use(express.json());

const	cors = require('cors');
app.use(cors());

const	Movie = require('./models/movie');

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

// create
app.post('/api/movies', (req, res, next) => {
	delete req.body._id;
	const movie = new Movie({
	  ...req.body
	});
	movie.save()
		.then(() => res.status(201).json({ message: "Movie created"}))
		.catch(error => res.status(400).json({ error }));
});

// read all
app.get('/api/movies', (req, res, next) => {
	Movie.find()
		.then(movies => res.status(200).json(movies))
		.catch(error => res.status(400).json({ error }));
});

// read one
app.get('/api/movies/:id', (req, res, next) => {
	Movie.findOne({ _id: req.params.id })
		.then(movie => res.status(200).json(movie))
		.catch(error => res.status(400).json({ error }));
});

// update
app.put('/api/movies/:id', (req, res, next) => {
	Movie.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    	.then(() => res.status(200).json({ message: "Movie updated"}))
    	.catch(error => res.status(400).json({ error }));
});

// delete
app.delete('/api/movies/:id', (req, res, next) => {
	Movie.deleteOne({ _id: req.params.id })
		.then(() => res.status(200).json({ message: "Movie deleted"}))
		.catch(error => res.status(400).json({ error }));
});

module.exports = app;