/**
 * @author Karthik <karthik.x@314ecorp.com>
 * @description Search
 */

import React from "react";
import _ from "lodash";
import { Form, Input, Button, DatePicker } from "antd";
import { Moment } from "moment";

const Search: React.FC<ISearchProps> = (props) => {
	const handleSearch = (value: ISearchState<Moment>) => {
		if (_.isFunction(props.onSearch)) {
			props.onSearch({
				title: value.title,
				year: value.year ? value.year.year() : null,
				page: 1,
			});
		} else {
			console.error("No Handler found");
		}
	};

	return (
		<Form layout={"inline"} onFinish={handleSearch}>
			<Form.Item label={"Title"} name={"title"}>
				<Input />
			</Form.Item>
			<Form.Item label={"Year"} name={"year"}>
				<DatePicker.YearPicker />
			</Form.Item>
			<Form.Item>
				<Button loading={props.loading} type={"primary"} htmlType={"submit"}>
					Search
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Search;
