const supabase = require('../configs/supabase')

const addMovies = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into movies (title, image, category, release_date, duration, director, casts, synopsis, seller_id, created_at)
                    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, now()) returning *`;
        const values = [data.title, data.image, data.category, data.releaseDate, data.duration, data.director, data.casts, data.synopsis, data.sellerId ];
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
        let sql = `select m.id, m.title, m.image as movies_image,m.category, m.synopsis, m.duration, m.release_date, m.duration, m.director, m.casts, m.synopsis, m.seller_id, t.show_date, t.show_time, c."name" as cinema_name, c.image as cinema_image from movies m left join cinemas c on c.movies_id = m.id left join "time" t on t.cinemas_id = c.id `;
        if(query.show && query.show === 'now') {
            sql += `where t.show_date <= now() `
        }
        if(query.show && query.show !== 'now') {
            let showDate = query.show.split('-')
            sql += `where date_part('month', t.show_date)=${showDate[1]} and date_part('year', t.show_date)=${showDate[0]} `
        }
        if(query.category !== undefined) {
            query.category && query.show ? sql+=`and lower(category) like lower('%${query.category}%') ` :  sql += `where lower(category) like lower('%${query.category}%') `
        }
        if (query.search) {
            query.search && query.show ? sql+=`and lower(title) like lower('%${query.search}%') ` : query.search && query.category ? sql+=`and lower(title) like lower('%${query.search}%') ` : sql += `where lower(title) like lower('%${query.search}%') `
        }
        switch (query.sort) {
            case "name_asc":
                sql += `order by m.title asc `;
                break;
            case "name_desc":
                sql += `order by m.title desc `;
                break;
            case "release_asc":
                sql += `order by m.release_date asc `;
                break;
            case "release_desc":
                sql += `order by m.release_date desc `;
                break;
            case "duration_asc":
                sql += `order by m.duration asc `;
                break;
            case "duration_desc":
                sql += `order by m.duration desc `;
                break;
            default: sql += `order by m.title asc `;
        }

        const limit = Number(query.limit || 10);
        const page = Number(query.page || 1);
        const offset = (page - 1) * limit

        sql += `limit $1 offset $2`;
        console.log(sql);
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
        let sql = `select count(*) as total_movies from movies m left join cinemas c on c.movies_id = m.id left join "time" t on t.cinemas_id = c.id `;
        let endpoint = `/movies?`;
        if(query.show && query.show === 'now') {
            sql += `where t.show_date <= now() `
            endpoint += `show=${query.show}&`;
        }
        if(query.show && query.show !== 'now') {
            let showDate = query.show.split('-')
            sql += `where date_part('month', t.show_date)=${showDate[1]} and date_part('year', t.show_date)=${showDate[0]} `
            endpoint += `show=${query.show}&`;
        }
        if(query.category !== undefined) {
            query.category && query.show ? sql+=`and lower(category) like lower('%${query.category}%') ` :  sql += `where lower(category) like lower('%${query.category}%') `
            endpoint += `category=${query.category}&`;
        }
        if (query.search !== undefined) {
            query.search && query.show ? sql+=`and lower(title) like lower('%${query.search}%') ` : query.search && query.category ? sql+=`and lower(title) like lower('%${query.search}%') ` : sql += `where lower(title) like lower('%${query.search}%') `
            endpoint += `search=${query.search}&`;
        }
        if (query.sort !== undefined) {
            endpoint += `sort=${query.sort}&`;
        }
        if (query.show !== undefined) {
            endpoint += `show=${query.show}&`;
        }
        supabase.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            }
            const totalMovies = Number(result.rows[0].total_movies);
            const page = Number(query.page || 1);
            const dataLimit = Number(query.limit || 10);
            const totalPage = Math.ceil(totalMovies / dataLimit);
            
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
        if (data.title != null) {
            dataAvail.push('title=')
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
        const rawValues = [data.title, data.image, data.category, data.releaseDate, data.duration, data.director, data.casts, data.synopsis, params.id];
        const values = rawValues.filter(d => d);
        let sql = `update movies set ${dataQuery} where id=$${values.length} RETURNING *`;
        console.log(sql);
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

const updateMoviesImage = (client, req, fileLink) => {
    return new Promise((resolve, reject) => {
      let sqlQuery = "UPDATE movies SET ";
      let values = [];
      let i = 1;
      const body = req.body;
      if (body.password) {
        delete body.password;
      }
      for (const [key, val] of Object.entries(body)) {
        sqlQuery += `${key} = $${i}, `;
        values.push(val);
        i++;
      }
      if (req.file) {
        sqlQuery += `image = '${fileLink}', `;
      }
  
      sqlQuery = sqlQuery.slice(0, -2);
      sqlQuery += ` WHERE id = $${i} RETURNING *`;
      values.push(req.authInfo.id);
      console.log(sqlQuery);
      client.query(sqlQuery, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };

module.exports = {
    addMovies,
    getAllMovies,
    getSingleMovies,
    getMetaMovies,
    editMovies,
    deleteMovies,
    updateMoviesImage,

}