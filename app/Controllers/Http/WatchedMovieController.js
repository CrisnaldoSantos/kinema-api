'use strict'

const Movie = use('App/Models/Movie');
const Watched = use('App/Models/Watched');
class WatchedMovieController {
    async index ({params, auth}) {

        const mov = await Movie.query().where('user_id',auth.user.id).where('watched_flag',true).paginate(params.page,10);
        
        return mov;
    }
}

module.exports = WatchedMovieController
