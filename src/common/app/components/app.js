if(__BROWSER__){
	require('./style')
}

import React from 'react'
import Navigation from 'framework/navigation'

export default class App extends React.Component {
	render(){
		return <div>
			<div>Welcome to the real world afd</div>
			<Navigation />
			{this.props.children}
		</div>
	}
}