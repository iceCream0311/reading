import React,{Component}  from 'react';
import {Link} from 'react-router-dom';
import  './goHome.css';
export default class GoHome extends Component{
 render(){
  return(
    <div className="go-home container"><Link to="/">首页</Link></div>
   )
 }
}