import { randomActorIdList } from "./actorsRandomList";
import { randomMovieIdList } from "./moviesRandomList";

//api key
const apiKey = "?api_key=6d297bdaca2dc66c4fe66393850480f4";

//declaration of api urls used in the project
const baseUrl = "https://api.themoviedb.org/3/";

// const movieUrl = `${baseUrl}discover/movie?sort_by=popularity.desc${apiKey}&language=fr&with_cast=${randomActorIdList}`;
const movieUrl = `${baseUrl}movie/${randomMovieIdList}${apiKey}&language=fr&append_to_response=credits`;
const actorUrl = `${baseUrl}person/${randomActorIdList}${apiKey}`;

export { actorUrl, movieUrl };
