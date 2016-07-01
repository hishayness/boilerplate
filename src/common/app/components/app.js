if(process.env.BROWSER === true){
	require('./style.less')
}

import React from 'react'
import Navigation from 'framework/navigation'

export default class App extends React.Component {
	render(){
		return <div>
			<img src="/images/hello.gif" />
			<div>Welcome to the real world !</div>
			<Navigation />
			{this.props.children}
		</div>
	}
}