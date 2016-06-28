import React from 'react'
import Navigation from 'framework/navigation'

export default class App extends React.Component {
	render(){
		return <div>
			<div>This is my app</div>
			<Navigation />
			{this.props.children}
		</div>
	}
}