import React,{Component}  from 'react';
import {Link} from 'react-router-dom';
import {GetQueryString} from '../../utils/commit.js';
import  './loading.css';
export default class Loading extends Component{
 render(){
  return(
   <div className="loading-box">
     <div>
       <div className="loading-circle"></div>
       <div className="circle"></div>
       <div className="circle1"></div>
       <div className="circle2" ></div>
       <div className="circle3"></div>
       <div className="circle4"></div>
       <div className="circle5"></div>
       <div className="circle6"></div>
       <div className="circle7"></div>
     </div>
   </div>
   )
 }
}