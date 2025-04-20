const getMovies = "SELECT * FROM movies";
const getMovieById = "SELECT * FROM movies WHERE id = $1";
const checkTitleExists = "SELECT m FROM movies m WHERE m.title = $1";
const addMovie = "INSERT INTO movies (title,genre,release_year,director,rating) VALUES ($1,$2,$3,$4,$5)";
const updateMovie= "UPDATE movies SET title = $1 WHERE id = $2";


module.exports = {
    getMovies,
    getMovieById,
    checkTitleExists,
    addMovie,
    updateMovie,
};