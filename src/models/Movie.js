export class Movie {
    static createFromApi(data = {}) {
        return {
            id: data.filmId || '',
            original_title: data.nameRu || data.nameEn || '',
            poster_path: data.posterUrlPreview || '',
            release_date: data.year || '',
            overview: data.description || '',
        };
    }
}