import React, { Component } from 'react';
import { createProvider } from 'react-redux';
import { Container } from 'native-base';
import Appbase from 'appbase-js';

import configureStore, { storeKey } from '@appbaseio/reactivecore';

import types from '@appbaseio/reactivecore/lib/utils/types';

/* use a custom store key so reactivesearch does not interfere
   with a different redux store in a nested context */
const Provider = createProvider(storeKey);

class ReactiveBase extends Component {
	constructor(props) {
		super(props);

		this.type = props.type ? props.type : '*';

		const credentials = props.url && props.url.trim() !== '' && !props.credentials
			? 'user:pass'
			: props.credentials;

		const config = {
			url: props.url && props.url.trim() !== '' ? props.url : 'https://scalr.api.appbase.io',
			app: props.app,
			credentials,
			type: this.type,
		};

		const appbaseRef = new Appbase(config);
		this.store = configureStore({ config, appbaseRef });
	}

	render() {
		return (
			<Provider store={this.store}>
				<Container>
					{this.props.children}
				</Container>
			</Provider>
		);
	}
}

ReactiveBase.propTypes = {
	type: types.string,
	url: types.string,
	credentials: types.string,
	app: types.stringRequired,
	children: types.children,
};

export default ReactiveBase;