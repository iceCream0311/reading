import React,{Component}  from 'react';
import {Link} from 'react-router-dom';
import {GetQueryString} from '../../utils/commit.js';
import  './goHome.css';
export default class GoHome extends Component{
 constructor(props){
  super(props);
  this.state={
   openid:""
  }
 }
 componentWillMount(){
  let openid=GetQueryString("openid");
    this.setState({
      openid:openid
    })
 }
 render(){
  return(
    <div className="go-home container"><Link to={this.state.openid?`/?openid=${this.state.openid}`:"/"}>首页</Link></div>
   )
 }
}