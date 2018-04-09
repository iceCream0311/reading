import React, { Component} from 'react';
import {Link}  from 'react-router-dom';
import {RecommendArr} from './data.js';
import {GetQueryString} from '../../utils/commit.js';
import axios from 'axios';
import {url} from '../../utils/href.js';
import './history.css'
export default class History extends Component {
 constructor(props){
   super(props);
   this.state={
    delKey:"",
    markeflag:false,
    openid: 0,
    recommendList:[],
    delall:false
   }
 }
  componentDidMount(){
     this.search()
 }
 /* 清空历史记录*/
 emptyFn=()=>{
  this.setState({
   delKey:0,
   markeflag:true,
   delall:true
  })
 }
 delFn=(e)=>{
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
  this.setState({
   delKey:e.target.getAttribute("data-key"),
   markeflag:true,
   delall:false
  })
 }
 search=()=>{
   let openid=GetQueryString("openid");
   this.setState({
    openid:openid
   })
    /* 获取小说章节列表*/
   axios.get(`${url}/novel/read/history`,{
     params:{
      openId:openid
     }
    })
   .then((res)=>{
    this.setState({
     recommendList:res.data.body
    })
   })
   .catch((error)=>{
    console.log(error)
   })
 }
scaleFn=()=>{
  this.setState({
   markeflag:false
  })
 }
 makesureFn=()=>{
  this.setState({
   markeflag:false
  })
  let openid=this.state.openid;
  let novelId=this.state.delKey;
  let search=this.search;
   /* 获取小说章节列表*/
  axios.get(`${url}/novel/history/delete`,{
    params:{
     openId:openid,
     novelId:novelId
    }
   })
  .then((res)=>{
    alert("已删除成功");
    search()
  })
  .catch((error)=>{
    alert("删除失败请稍后再试")
  })
 }
 render(){
  return(
   <div id="history">
   <div className="go-home container">
    <span className="empty" onClick={this.emptyFn}>清空</span>
    <span className="margin-dom">
    </span><Link to={this.state.openid?`/?openid=${this.state.openid}`:"/"}>首页</Link>
   </div>
    <div className="container">
     <ul className="Recommend">
     {
      RecommendArr.map((item,index)=>{
       return(
        <li key={index}>
         <Link to="/">
          <div className="left-box">
            <img src={item.cover} alt={item.title}/>
          </div>
          <div className="right-box">
           <h3>{item.title}</h3><p className="category">{item.category}</p>
           <p className="desc"> {item.description}</p>
          </div>
         </Link>
        </li>
      )
      })
     }
    </ul>
     <ul className="recommend-list">
     {
      this.state.recommendList.map((item,index)=>{
       return(
        <li key={index}>
         <Link to={`/detail?id=${item.novelId}&openid=${this.state.openid}&chapter=${item.chapterId}`}>
          <h3>{item.title}</h3>
          <div className="bottom-box">
            <div className="left">
              <span className="author">{item.author}</span>
              <span className="chapter">
                <span className="current">已读{item.chapterId}章</span>
                <span className="total">共{item.chapterCount}章</span>
              </span>
            </div>
          </div>
         </Link>
          <div className="right" data-key={item.novelId} onClick={this.delFn}>
             删除
           </div>
        </li>
      )
      })
     }
    </ul>
   </div>
   {
    this.state.markeflag?
       <div className="mask">
    <div className="confirmModal">
     <div className="content">
      <p className="tip">{this.state.delall?"是否清空历史记录,删除后无法恢复":"是否删除该条记录,删除后无法恢复"}</p>
     </div>
     <div className="action">
      <a className="btn btn-cancel"  onClick={this.scaleFn}>取消</a>
      <a className="btn btn-ok" onClick={this.makesureFn}>确定</a>
     </div>
     </div>
   </div>:""
   }

   </div>
   )
 }
}