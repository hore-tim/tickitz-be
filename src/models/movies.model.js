const supabase = require('../configs/supabase')

const addMovies = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into movies (name, image, category, release_date, duration, director, casts, synopsis, created_at)
                    values ($1, $2, $3, $4, $5, $6, $7, $8, now()) returning *`;
        const values = [data.name, data.image, data.category, data.releaseDate, data.duration, data.director, data.casts, data.synopsis];
        supabase.query(sql, values, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    });
};

const getAllMovies = (query) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from movies `;
        switch (query.sort) {
            case "name_asc":
                sql += `order by name asc `;
                break;
            case "name_desc":
                sql += `order by name desc `;
                break;
            case "release_asc":
                sql += `order by release_date asc `;
                break;
            case "release_desc":
                sql += `order by release_date desc `;
                break;
            case "duration_asc":
                sql += `order by duration asc `;
                break;
            case "duration_desc":
                sql += `order by duration desc `;
                break;
            default: sql += `order by name asc `;
        }

        sql += `limit 5`;

        supabase.query(sql, ((err, result) => {
            if(err) {
                return reject(err)
            }
            resolve(result)
        }))
    })
}

const getSingleMovies = (params) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from movies where id = $1`;
        supabase.query(sql, [params.id], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
}

const deleteMovies = (params) => {
    return new Promise((resolve, reject) => {
        const sql = `delete from movies where id=$1`;
        supabase.query(sql, [params.id], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        }
        );
    })
}

module.exports = {
    addMovies,
    getAllMovies,
    getSingleMovies,
    deleteMovies
}