import React, { Component} from 'react';
import {Link}  from 'react-router-dom';
import {GetQueryString} from '../../utils/commit.js';
import axios from 'axios';
import {url} from '../../utils/href.js';
import GoHome from '../../compontents/goHome/goHome.js';
import './detailBook.css'
export default class DetailBook extends Component {
 constructor(props){
  super(props);
  /* novelId:文章id*/
  this.state={
   data:{
   novelcover:"",
   lastchapter:"",
   wordcount:"",
   description:"",
   name:"",
   classCategoryName:"",
   status:"",
   showFlag:false
  }
  }
 }
 componentWillMount(){
   /* novelId:文章id*/
 let novelId=GetQueryString("id");
 axios.get(`${url}/novel/info`,{
    params:{
      novelid:novelId
    }
   })
  .then((res)=>{
   this.setState({
     data:res.data.body
   })
  })
  .catch((error)=>{
   console.log(error)
  })

 }
 showFn=()=>{
  console.log(1111111)
  this.setState({
   showFlag:!this.state.showFlag
  })
 }

 render(){
  return(
   <div className="detail-book">
    <GoHome />
    <div className="container">
    <div className="m-bookcover">
     <div className="inner">
      <div className="img">
       <img src={this.state.data.novelcover} />
      </div>
      <div className="detail">
       <h2>{this.state.data.name}</h2>
       <h6>{this.state.data.classCategoryName} |{this.state.data.author}</h6>
       <h6>{(this.state.data.wordcount/10000).toFixed(2)}万字 | 1.04亿次点击</h6>
       <a className="read" href="/">立即阅读</a>
       </div>
       <div className={this.state.showFlag?"summary expanded":"summary"}>
        <content onClick={this.showFn}>{this.state.data.description}</content>
        {!this.state.showFlag?<span className="summary-more" onClick={this.showFn}></span>:""}
        </div>
        <div className="new">
        <a href="/">
        <i></i>
        <span>当前更新至 第{this.state.data.lastchapter}章 金蝉脱壳</span>
        <span className="state">{this.state.data.status==="1"&&"连载中"}</span>
        </a>
      </div>
     </div>
     </div>
    </div>
   </div>
   )
 }
}