import { defineStore } from "pinia"
import { useMovieStore } from "./MovieStore";
// import { API_KEY } from "../env";
import { Movie } from "../models/Movie";

import { ref } from 'vue'; //Composition Api

const url = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/'
const API_KEY = "1a9d7811-b08f-4cde-ad8c-2fafa8b5c435";

//Options Api

// export const useSearchStore = defineStore("searchStore", {
//     state: () => ({
//         loader: false,
//         movies: []
//     }),
//     actions: {
//         async getMovies(search) {
//             this.loader = true;
//             const res = await fetch(`${url}search-by-keyword?${new URLSearchParams({ keyword: search }).toString()}`, {
//                 method: 'GET',
//                 headers: {
//                     'X-API-KEY': API_KEY,
//                     'Content-Type': 'application/json',
//                 },
//             })
//                 .then(res => res.json())
//                 .catch(err => console.log(err))

//             this.movies = res.films.map(el => {
//                 return Movie.createFromApi(el);
//             });
//             this.loader = false;
//         },
//         addToUserMovies(object) {
//             // console.log(object);
//             const movieStore = useMovieStore();
//             movieStore.movies.push({ ...object, isWatched: false });
//             movieStore.activeTab = 1;
//         }
//     }
// });


//Composition Api

export const useSearchStore = defineStore('searchStore', () => {
    const loader = ref(false)
    const movies = ref([])

    const getMovies = async (search) => {
        loader.value = true;
        const res = await fetch(`${url}search-by-keyword?${new URLSearchParams({ keyword: search }).toString()}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .catch(err => console.log(err))

        movies.value = res.films.map(el => {
            return Movie.createFromApi(el);
        });
        loader.value = false;
    }

    const addToUserMovies = (object) => {
        const movieStore = useMovieStore();
        movieStore.movies.push({ ...object, isWatched: false });
        movieStore.activeTab = 1;
    }

    return {
        loader, movies, getMovies, addToUserMovies
    }
})