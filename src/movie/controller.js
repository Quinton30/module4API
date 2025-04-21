const { get } = require("express/lib/response");
const pool = require('../../db');
const queries = require('./queries');


const getMovies = (req,res) => {
    pool.query(queries.getMovies,(error,results) => 
    {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);

    })
};

const getMovieById = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getMovieById,[id],(error,results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
};

const addMovie = (req,res) => {
    const{title,genre,release_year,director,rating} = req.body;

    //check if movie exist
    pool.query(queries.checkTitleExists,[title], (error,results)=>
        {
        if(results.rows.length > 0){
            res.send("Title exists already")
        }

        //add movie to database
        pool.query(queries.addMovie,[title,genre,release_year,director,rating],(error,results) => {
            if(error){
                throw error;
            }
            res.status(201).send("Movie added sucessfully! well done!");
        });  
    });
}; 

const updateMovie = (req,res) => {
    const id = parseInt(req.params.id);
    const  {title} = req.body;

    pool.query(queries.getMovieById,[id],(error,results) => {
        if(error){
            throw error;
        }
        if(results.rows.length === 0){
            res.send("The movie does not exist in the database");
        }
        pool.query(queries.updateMovie,[title,id],(error,results) => {
            if(error){
                throw error;
            }
            res.status(200).send("Movie updated sucessfully");
        })
    })
}

module.exports = {
    getMovies,
    getMovieById,
    addMovie,
    updateMovie,
};
