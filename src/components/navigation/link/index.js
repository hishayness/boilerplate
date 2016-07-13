import React, { Component } from 'react'
import Link from 'react-router/lib/Link'

export default class NavLink extends Component {
	render(){
		return <Link {...this.props} />
	}
}