import React, { Component } from 'react'
import style from './style'
import withStyles from 'src/decorators/withStyles';

@withStyles(style)
export default class Button extends Component {
	render(){
		return <button className={style.button}>{this.props.children}</button>
	}
}