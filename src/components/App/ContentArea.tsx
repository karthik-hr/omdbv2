/**
 * @author Karthik <karthik.x@314ecorp.com>
 * @description Content Area
 */

import React from "react";
import { Button, Layout, Result } from "antd";

class ContentArea extends React.PureComponent {
	state = {
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	handleReload = () => {
		this.setState({ error: false }, () => {
			this.forceUpdate();
		});
	};

	render() {
		let content;
		if (this.state.error) {
			content = <Result status={"error"} extra={[<Button onClick={this.handleReload}>Reload</Button>]} />;
		} else {
			content = this.props.children;
		}

		return (
			<Layout>
				<Layout.Header style={{ position: "fixed", zIndex: 1, width: "100%", color: "#fff" }}>
					OMDB
				</Layout.Header>
				<Layout.Content style={{ padding: "0 50px", marginTop: 64 }}>{content}</Layout.Content>
				<Layout.Footer></Layout.Footer>
			</Layout>
		);
	}
}

export default ContentArea;
