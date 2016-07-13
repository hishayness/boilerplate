import React, { Component } from 'react'
import NavLink from './link'

export default class Navigation extends Component {
	render(){
		return <ul>
			<li><NavLink to="/">Home</NavLink></li>
			<li><NavLink to="/about">About</NavLink></li>
		</ul>
	}
}