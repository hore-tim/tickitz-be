const supabase = require('../configs/supabase')

const addMovies = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into movies (name, image, category, release_date, duration, director, casts, synopsis, posted_by, created_at)
                    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, now()) returning *`;
        const values = [data.name, data.image, data.category, data.releaseDate, data.duration, data.director, data.casts, data.synopsis, data.userId ];
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
        if(query.show === true) {
            sql += `where release_date <= now() `
        }
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

        const limit = Number(query.limit || 10);
        const page = Number(query.page || 1);
        const offset = (page - 1) * limit

        sql += `limit $1 offset $2`;

        supabase.query(sql, [limit, offset], ((err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        }));
    });
};

const getMetaMovies = (query) => {
    return new Promise((resolve, reject) => {
        const sql = `select count(*) as total_movies from movies`;
        let endpoint = `/movies?`;
        if (query.sort !== undefined) {
            endpoint += `sort=${query.sort}&`;
        }
        supabase.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            }
            const totalMovies = Number(result.rows[0].total_movies);
            const page = Number(query.page || 1);
            const dataLimit = Number(query.limit || 10);
            const totalPage = Math.ceil(totalMovies / dataLimit);
            // switch (query.sort) {
            //     case "name_asc":
            //         endpoint += `sort=name_asc&`;
            //         break;
            //     case "name_desc":
            //         endpoint += `sort=name_desc&`;
            //         break;
            //     case "release_asc":
            //         endpoint += `sort=release_asc&`;
            //         break;
            //     case "release_desc":
            //         endpoint += `sort=release_desc&`;
            //         break;
            //     case "duration_asc":
            //         endpoint += `sort=duration_asc&`;
            //         break;
            //     case "duration_desc":
            //         endpoint += `sort=duration_desc&`;
            //         break;
            // }
            let prev = `${endpoint}limit=${dataLimit}&page=${page - 1}`;
            let next = `${endpoint}limit=${dataLimit}&page=${page + 1}`;
            if (page === 1) {
                prev = null
            }
            if (page === totalPage) {
                next = null
            }
            const meta = {
                totalMovies,
                totalPage,
                page,
                prev,
                next
            }
            resolve(meta)

        })
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

const getShowingMovies = (params) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from movies where release_date <= now() `;
        supabase.query(sql, [params.id], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
}

const editMovies = (data, params) => {
    return new Promise((resolve, reject) => {
        const dataAvail = [];
        if (data.name != null) {
            dataAvail.push('name=')
        }
        if (data.image != null) {
            dataAvail.push('image=')
        }
        if (data.category != null) {
            dataAvail.push('category=')
        }
        if (data.releaseDate != null) {
            dataAvail.push('release_date=')
        }
        if (data.duration != null) {
            dataAvail.push('duration=')
        }
        if (data.director != null) {
            dataAvail.push('director=')
        }
        if (data.casts != null) {
            dataAvail.push('casts=')
        }
        if (data.synopsis != null) {
            dataAvail.push('synopsis=')
        }
        const dataQuery = dataAvail.map((data, i) => (`${data}$${i + 1}`)).join(`, `)
        const rawValues = [data.name, data.image, data.category, data.releaseDate, data.duration, data.director, data.casts, data.synopsis, params.id];
        const values = rawValues.filter(d => d);
        let sql = `update movies set ${dataQuery} where id=$${values.length} RETURNING *`;
        supabase.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
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
    getMetaMovies,
    editMovies,
    deleteMovies,

}