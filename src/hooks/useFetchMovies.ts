/**
 * @author Karthik <karthik.x@314ecorp.com>
 * @description fetch movies
 */

import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import axios from "axios";
import _ from "lodash";

import { BASE_URL, APIKEY } from "../constants/index";

const useFetchMovies = (
	{ title, year, page }: ISearchState,
	options: UseQueryOptions<IMoviesList, string>
): UseQueryResult<IMoviesList, string> => {
	return useQuery(
		["query-movies", title, year, page],
		async () => {
			const url = new URL(BASE_URL);
			url.searchParams.set("apikey", APIKEY);
			if (title) url.searchParams.set("s", title);
			if (year) url.searchParams.set("y", _.toString(year));
			if (page) url.searchParams.set("page", _.toString(page));
			const { data } = await axios.get(url.href);

			if (data.Response === "False") {
				throw data.Error;
			}

			return data;
		},
		options
	);
};

export default useFetchMovies;
