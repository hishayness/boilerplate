import React, { Component } from 'react'
import Navigation from 'framework/navigation'
import Menu from 'framework/menu'
import './style'

class App extends Component {
	render(){
		return <div>
			<div>Welcome to the real world</div>
			<Navigation />
			<Menu />
			{this.props.children}
		</div>
	}
}

module.exports = App