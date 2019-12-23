import React, { Component } from 'react';
import { CircleLoader } from 'react-spinners';

//import '../../../styles/common/ui/Spinner.css';

const override = `
    display: block;
    margin: 0 auto;
    border-color: red;`;

class LoadingSpinner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	render() {
		return <CircleLoader css={override} color={'#3D5AFE'} loading={this.state.loading} size={100} />;
	}
}

export default LoadingSpinner;
