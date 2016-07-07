import React, { Component } from 'react'
import style from './style'
import withStyles from 'src/decorators/withStyles';

@withStyles(style)
export default class Input extends Component {
	render(){
		return <input className={style.input} type="text" />
	}
}