if(process.env.BROWSER === true){
	require('./style.less')
}

import React, { Component } from 'react'

export default class Movies extends Component {
	render(){
		return <div>
			Movies page
		</div>
	}
}