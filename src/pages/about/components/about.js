import React, { Component } from 'react'
import style from './style'
import withStyles from 'src/decorators/withStyles';

@withStyles(style)
class About extends Component {
	render(){
		return <div>
			<div>ABOUT</div>
		</div>
	}
}

module.exports = About