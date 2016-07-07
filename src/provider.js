import React, { Component, PropTypes } from 'react'

export default class Provider extends Component {
	getChildContext() {
		return {
			insertCss: this.props.insertCss
		}
	}
	render() {
		return this.props.children;
	}
}

Provider.propTypes = {
	insertCss: PropTypes.func.isRequired
}

Provider.childContextTypes = {
	insertCss: PropTypes.func.isRequired
}