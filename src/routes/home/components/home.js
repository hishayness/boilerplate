import React, { Component } from 'react'
import style from './style'
import withStyles from 'src/decorators/withStyles';

import Button from 'framework/utils/button'
import Input from 'framework/utils/input'

@withStyles(style)
export default class Home extends Component {
	render(){
		return <div>
			<div>My Home</div>
			<Button>Hover Me</Button>
			<Input />
		</div>
	}
}