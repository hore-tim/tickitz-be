const { Router } = require("express");
const moviesRouter = Router();

const moviesController = require("../controllers/movies.controller");

moviesRouter.get('/', moviesController.getAllMovies)
moviesRouter.get('/:id', moviesController.getSingleMovies)
moviesRouter.post('/', moviesController.addMovies)
moviesRouter.delete('/:id', moviesController.deleteMovies)

module.exports = moviesRouter;