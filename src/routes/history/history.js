import React, { Component} from 'react';
import {Link}  from 'react-router-dom';
import {RecommendArr,RecommendList} from './data.js';
import './history.css'
export default class History extends Component {
 constructor(props){
   super(props);
   this.state={
    delKey:"",
    markeflag:false
   }
 }
 delFn=(e)=>{
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
  this.setState({
   delKey:e.target.getAttribute("data-key"),
   markeflag:true
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
  console.log(this.state.delKey)
 }
 render(){
  return(
   <div id="history">
   <div className="go-home container">
    <span className="empty">清空</span>
    <span className="margin-dom">
    </span><Link to="/">首页</Link>
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
      RecommendList.map((item,index)=>{
       return(
        <li key={index}>
         <Link to="/">
          <h3>{item.title}</h3>
          <div className="bottom-box">
            <div className="left">
              <span className="author">{item.author}</span>
              <span className="chapter">
                <span className="current">已读{item.readCount}章</span>
                <span className="total">共{item.totalCount}章</span>
              </span>
            </div>
          </div>
         </Link>

          <div className="right" data-key={item.articleUuid} onClick={this.delFn}>
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
      <p className="tip">是否删除该条记录,删除后无法恢复</p>
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