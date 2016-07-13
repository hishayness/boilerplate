import React, { Component, PropTypes } from 'react'

export default class Stylizer extends Component {
	static propTypes = {
		insertCss: PropTypes.func.isRequired
	}

	static childContextTypes = {
		insertCss: PropTypes.func.isRequired
	}

	getChildContext() {
		return {
			insertCss: this.props.insertCss
		}
	}

	render() {
		return this.props.children;
	}
}