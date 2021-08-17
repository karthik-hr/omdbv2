declare interface IResponseError {
	Error: string;
	Response: "False";
}

declare interface IMovie {
	Actors: string;
	Awards: string;
	BoxOffice: string;
	Country: string;
	DVD: string;
	Director: string;
	Genre: string;
	Language: string;
	Metascore: string;
	Plot: string;
	Poster: string;
	Production: string;
	Rated: string;
	Ratings: Record<"Source" | "Value", string>[];
	Released: string;
	Response: "True";
	Runtime: string;
	Title: string;
	Type: string;
	Website: string;
	Writer: string;
	Year: string;
	imdbID: string;
	imdbRating: string;
	imdbVotes: string;
}

declare interface IMovieMini {
	Poster: string;
	Title: string;
	Type: string;
	Year: string;
	imdbID: string;
}

declare interface IMoviesList {
	Search: IMovieMini[];
	Response: "True";
	totalResults: string;
}

declare type TMovie = IMovie | IResponseError;

declare type TMovies = IMoviesList | IResponseError;
