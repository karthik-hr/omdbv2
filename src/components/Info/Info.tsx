/**
 * @author Karthik <karthik.x@314ecorp.com>
 * @description Info
 */

import React from "react";
import { Button, Descriptions, List, Modal, Spin, Tag, Result, Skeleton } from "antd";
import _ from "lodash";

import useFetchMovie from "../../hooks/useFetchMovie";

interface IProps {
	imdbID?: string;
	onClose?: () => void;
}

const Info: React.FC<IProps> = ({ imdbID, onClose }) => {
	const isEmpty = _.isEmpty(imdbID);
	const { data, isLoading, isFetching, isError, isSuccess, refetch } = useFetchMovie(imdbID, {
		enabled: !isEmpty,
		keepPreviousData: false,
	});

	const title = isFetching ? (
		<Skeleton.Input active size={"small"} style={{ width: "200px" }} />
	) : (
		<>
			{data?.Title} ({data?.Year}) <Tag>{data?.Type}</Tag>
		</>
	);

	let content;
	if (isLoading) {
		content = <Spin />;
	}

	if (isError) {
		content = (
			<Result
				status={"error"}
				title={"Oops! Something went wrong"}
				extra={[
					<Button type={"primary"} onClick={() => refetch()}>
						Retry
					</Button>,
				]}
			/>
		);
	}

	if (isSuccess) {
		const boxoffice =
			_.toNumber(data?.imdbRating) > 6 ? <Tag color="#87d068">Hit</Tag> : <Tag color="#f50">Flop</Tag>;
		content = (
			<Spin spinning={isFetching}>
				<List.Item.Meta
					avatar={
						<>
							<div>
								<img src={data?.Poster} alt={"Poster"} />
							</div>
							<Descriptions title={"Rating"} size={"small"} column={1} style={{ width: "300px" }}>
								{_.map(data?.Ratings, ({ Source, Value }) => (
									<Descriptions.Item key={Source} label={Source}>
										{Value}
									</Descriptions.Item>
								))}
							</Descriptions>
						</>
					}
					description={
						<Descriptions size={"small"} column={1}>
							<Descriptions.Item>{data?.Plot}</Descriptions.Item>
							<Descriptions.Item label={"Boxoffice"}>{boxoffice}</Descriptions.Item>
							<Descriptions.Item label={"Actors"}>{data?.Actors}</Descriptions.Item>
							<Descriptions.Item label={"Awards"}>{data?.Awards}</Descriptions.Item>
							<Descriptions.Item label={"BoxOffice"}>{data?.BoxOffice}</Descriptions.Item>
							<Descriptions.Item label={"Country"}>{data?.Country}</Descriptions.Item>
							<Descriptions.Item label={"DVD"}>{data?.DVD}</Descriptions.Item>
							<Descriptions.Item label={"Director"}>{data?.Director}</Descriptions.Item>
							<Descriptions.Item label={"Genre"}>{data?.Genre}</Descriptions.Item>
							<Descriptions.Item label={"Language"}>{data?.Language}</Descriptions.Item>
							<Descriptions.Item label={"Metascore"}>{data?.Metascore}</Descriptions.Item>
							<Descriptions.Item label={"Production"}>{data?.Production}</Descriptions.Item>
							<Descriptions.Item label={"Rated"}>{data?.Rated}</Descriptions.Item>
							<Descriptions.Item label={"Released"}>{data?.Released}</Descriptions.Item>
							<Descriptions.Item label={"Runtime"}>{data?.Runtime}</Descriptions.Item>
							<Descriptions.Item label={"Website"}>{data?.Website}</Descriptions.Item>
							<Descriptions.Item label={"Writer"}>{data?.Writer}</Descriptions.Item>
							<Descriptions.Item label={"imdbRating"}>{data?.imdbRating}</Descriptions.Item>
							<Descriptions.Item label={"imdbVotes"}>{data?.imdbVotes}</Descriptions.Item>
						</Descriptions>
					}
				/>
			</Spin>
		);
	}

	return (
		<Modal visible={!isEmpty} width={"80%"} title={title} footer={null} onCancel={onClose}>
			{content}
		</Modal>
	);
};

export default Info;
