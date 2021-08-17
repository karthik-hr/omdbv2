/**
 * @author Karthik <karthik.x@314ecorp.com>
 * @description Home page
 */

import React, { useState } from "react";
import { Button, Descriptions, List, PageHeader, Result } from "antd";
import _ from "lodash";

import Info from "../components/Info/Info";
import Search from "../components/Search/Search";
import useFetchMovies from "../hooks/useFetchMovies";

const Home = () => {
	const [searchParams, setSearchParams] = useState<ISearchState>({ title: null, year: null, page: 1 });
	const [imdbID, setImdbID] = useState("");

	const { data, error, isLoading, isFetching, isError, refetch } = useFetchMovies(searchParams, {
		enabled: !!searchParams.title,
	});

	const handlePageChange = (page: number) => {
		setSearchParams({ ...searchParams, page });
	};

	const showMovieInfo = (imdb: string) => {
		setImdbID(imdb);
	};

	let content;
	if (isError) {
		content = (
			<Result
				status={"error"}
				title={_.isString(error) ? error : "Oops! Something went wrong"}
				extra={[
					<Button key={"refetch"} onClick={() => refetch()}>
						Retry
					</Button>,
				]}
			/>
		);
	} else {
		let total = _.toNumber(data?.totalResults);
		total = _.isNaN(total) ? 0 : total;
		content = (
			<>
				<List
					size={"small"}
					loading={isFetching}
					grid={{ gutter: 16, column: 2 }}
					dataSource={data?.Search}
					pagination={{ pageSize: 10, hideOnSinglePage: true, total, onChange: handlePageChange }}
					renderItem={(item) => (
						<List.Item style={{ background: "#ffffff", borderRadius: "5px" }}>
							<List.Item.Meta
								avatar={<img src={item?.Poster} alt={"Poster"} width={"164px"} />}
								description={
									<Descriptions title={item?.Title} size={"small"} column={1}>
										<Descriptions.Item label={"Type"}>{item?.Type}</Descriptions.Item>
										<Descriptions.Item label={"Year"}>{item?.Year}</Descriptions.Item>
										<Descriptions.Item>
											<Button type={"link"} onClick={() => showMovieInfo(item?.imdbID)}>
												more...
											</Button>
										</Descriptions.Item>
									</Descriptions>
								}
							/>
						</List.Item>
					)}
				/>
			</>
		);
	}

	return (
		<PageHeader title={"Search"} extra={<Search loading={isLoading} onSearch={setSearchParams} />}>
			{content}
			<Info imdbID={imdbID} onClose={() => setImdbID("")} />
		</PageHeader>
	);
};

export default Home;
