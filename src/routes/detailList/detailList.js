import React, { Component} from 'react';
import {Link}  from 'react-router-dom';
import {GetQueryString} from '../../utils/commit.js';
import axios from 'axios';
import {url} from '../../utils/href.js';
import GoHome from '../../compontents/goHome/goHome.js';
import './detailList.css'
export default class DetailList extends Component {
 constructor(props){
  super(props);
  this.state={
   openid:"",
   novelId:"",
   listData:[],
   chapterCount:0
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
   /* 获取小说章节列表*/
  axios.get(`${url}/novel/chapter/list`,{
    params:{
     openId:openid,
     novelId:novelId
    }
   })
  .then((res)=>{
   this.setState({
    listData:res.data.body.chapter,
    current_chapter_id:res.data.body.current_chapter_id,
    chapterCount:res.data.body.chapterCount
  })
  })
  .catch((error)=>{
   console.log(error)
  })
 }

render(){
 return(
  <div className="detail-list">
   <GoHome />
   <div className="container">
    <div className="total">
     <span>共{this.state.chapterCount}章</span>
     <span className="order">倒序</span>
    </div>
    <div className="m-menu">
      <ul>
      {
        this.state.listData.map((item)=>{
          return(
           <li key={item.chapter_id} className={!item.pay_status&&"no-read"}>
            <Link className={this.state.current_chapter_id===item.chapter_id&&"red"} to={`/detail?id=${item.novel_id}&openid=${this.state.openid}&chapter=${item.chapter_id}`}>{item.chapter_id}、{item.title}</Link>
           </li>
          )
        })
      }
       </ul>
   </div>
   </div>
  </div>
  )
}
}