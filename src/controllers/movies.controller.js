const moviesModel = require('../models/movies.model')

const addMovies = async (req, res) => {
    try {
        const { body } = req;
        const result = await moviesModel.addMovies(body);
        res.status(201).json({
            data: result.rows,
            msg: "Success add new movies"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

const getAllMovies = async (req, res) => {
    try {
        const { query } = req;
        const result = await moviesModel.getAllMovies(query);
        if (result.rows.length === 0) {
            return res.status(404).json({
                data: result.rows,
                msg: "Data not found"
            });
        }
        const meta = await moviesModel.getMetaMovies(query);
        res.status(200).json({
            data: result.rows,
            meta,
            msg: "Get movies data"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
};

const getSingleMovies = async (req, res) => {
    try {
        const { params } = req;
        const result = await moviesModel.getSingleMovies(params)
        if (result.rows.length === 0) {
            return res.status(404).json({
                msg: "Movies not found"
            });
        };
        res.status(200).json({
            data: result.rows,
            msg: "Get movies data"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

const editMovies = async (req, res) => {
    try {
        const { body, params } = req;
        const result = await moviesModel.editMovies(body, params)
        res.status(201).json({
            data: result.rows,
            msg: "Success update movies"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

const deleteMovies = async (req, res) => {
    try {
        const { params } = req;
        const result = await moviesModel.getSingleMovies(params)
        if (result.rows.length === 0) {
            return res.status(404).json({
                msg: "Movies not found"
            });
        };
        await moviesModel.deleteMovies(params)
        res.status(201).json({
            data: result.rows,
            msg: "Success delete movies"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

module.exports = {
    getAllMovies,
    addMovies,
    getSingleMovies,
    editMovies,
    deleteMovies
}