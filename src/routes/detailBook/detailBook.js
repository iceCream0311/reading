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
  },
  listData:[],
  openid:"",
  novelId:""

  }
 }
 componentWillMount(){
   /* novelId:文章id*/
 let novelId=GetQueryString("id");
 let openid=GetQueryString("openid");
 this.setState({
  novelId:novelId,
  openid:openid
 })
 /* 获取小说详情*/
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
  /* 获取小说章节列表*/
  axios.get(`${url}/novel/chapter/list`,{
    params:{
      openId:openid,
      novelId:novelId
    }
   })
  .then((res)=>{
   this.setState({listData:res.data.body.chapter})
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
       <Link className="read" to={this.state.openid?`/detail?id=${this.state.novelId}&openid=${this.state.openid}`:`/detail?id=${this.state.novelId}`}>立即阅读</Link>
       </div>
       <div className={this.state.showFlag?"summary expanded":"summary"}>
        <content onClick={this.showFn}>{this.state.data.description}</content>
        {!this.state.showFlag?<span className="summary-more" onClick={this.showFn}></span>:""}
        </div>
        <div className="new">
        <Link to={this.state.openid?`/detail?id=${this.state.novelId}&openid=${this.state.openid}&chapter=${this.state.data.lastchapter}`:`/detail?id=${this.state.novelId}&lastchapter=${this.state.data.lastchapter}`}>
        <i></i>
        <span>当前更新至 第{this.state.data.lastchapter}章 金蝉脱壳</span>
        <span className="state">{this.state.data.status==="1"&&"连载中"}</span>
        </Link>
      </div>
     </div>
     </div>
    </div>
    <div className="m-menu">
      <ul>
      {
        this.state.listData>3?
        this.state.listData.slice(0,3).map((item)=>{
          return(
            <li key={item.chapter_id}>
            <Link to={`/detail?id=${item.novel_id}&openid=${this.state.openid}&chapter=${item.chapter_id}`}>{item.chapter_id}、{item.title}</Link>
            </li>)
        }):
        this.state.listData.slice(0,3).map((item)=>{
          return(
            <li key={item.chapter_id}>
             <Link to={`/detail?id=${item.novel_id}&openid=${this.state.openid}&chapter=${item.chapter_id}`}>{item.chapter_id}、{item.title}</Link>
            </li>
            )
        })
      }
      </ul>
      <div className="directory"><Link  to={`/detail_list?id=${this.state.novelId}&openid=${this.state.openid}`}>全部目录</Link></div>
    </div>
   </div>
   )
 }
}