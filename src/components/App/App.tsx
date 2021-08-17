/**
 * @author Karthik <karthik.x@314ecorp.com>
 * @description App
 */

import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import "antd/dist/antd.css";

import ContentArea from "./ContentArea";
import Home from "../../pages/Home";

const client = new QueryClient({ defaultOptions: { queries: { retry: false, keepPreviousData: true } } });

const App = () => {
	return (
		<QueryClientProvider client={client}>
			<ContentArea>
				<Home />
			</ContentArea>
		</QueryClientProvider>
	);
};

export default App;
