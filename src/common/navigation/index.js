import React, { Component } from 'react'
import Link from 'react-router/lib/Link'

class NavLink extends Component {
	render(){
		return <Link {...this.props} />
	}
}

class Navigation extends Component {
	render(){
		return <ul>
			<li><NavLink to="/">Home</NavLink></li>
			<li><NavLink to="/sidecasts">Sidecasts</NavLink></li>
			<li><NavLink to="/sidecasters">Sidecasters</NavLink></li>
			<li><NavLink to="/movies">Movies</NavLink></li>
		</ul>
	}
}

export default Navigation