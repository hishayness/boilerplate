import React, { Component } from 'react'
import style from './style'
import withStyles from 'src/decorators/withStyles';

@withStyles(style)
export default class Movies extends Component {
	render(){
		return <div className={style.page}>
			Movies page
		</div>
	}
}