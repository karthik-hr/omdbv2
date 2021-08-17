/**
 * @author Karthik <karthik.x@314ecorp.com>
 * @description fetch movies
 */

import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import axios from "axios";

import { BASE_URL, APIKEY } from "../constants/index";

const useFetchMovie = (imdbID?: string, options?: UseQueryOptions<IMovie, string>): UseQueryResult<IMovie, string> => {
	return useQuery(
		["query-movie", imdbID],
		async () => {
			const url = new URL(BASE_URL);
			url.searchParams.set("apikey", APIKEY);
			if (imdbID) url.searchParams.set("i", imdbID);
			const { data } = await axios.get(url.href);

			if (data.Response === "False") {
				throw data.Error;
			}

			return data;
		},
		options
	);
};

export default useFetchMovie;
