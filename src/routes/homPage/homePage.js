import React, { Component} from 'react';
import  {Link}from 'react-router-dom';
import  './homePage.css';
import axios from 'axios';
import {url} from '../../utils/href.js';
import Loading from '../../compontents/loading/loading';
import search from '../../images/search.png';
import person from '../../images/person.png';
import coin from '../../images/coin.png';
import book from '../../images/book.png';
import tj1 from '../../images/tj1.jpg';
import tj2 from '../../images/tj2.jpg';
import tj3 from '../../images/tj3.jpg';
import changebtn from '../../images/change.png';
import homeData from './data.js';
import {changeActiveColor,GetQueryString} from '../../utils/commit.js';
export default class HomePage extends Component {

 constructor(props){
   super(props);
   this.state={
    category:"man",
    openid:null,
    loading:false,
    historyFlag:true,
    tjArr:[
     {url:"/",img:tj1,title:"总裁欺上身，娇妻晚上见",author:"琪安"},
     {url:"/",img:tj2,title:"最强兵痞",author:"二斗"},
     {url:"/",img:tj3,title:"腹黑陆少你太坏",author:"江枫眠"}
     ],
      manArr:[],
      historytitle:"",
      historychapterId:0,
      historynovelId:1
    }
 }
 componentWillMount(){

  let openid=GetQueryString("openid");
  if(!openid){
    window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx57cfabeea947cb40&redirect_uri=http%3a%2f%2fwx.devtop.top%2fwx&response_type=code&scope=snsapi_userinfo&#wechat_redirect' )
  }else{
    this.setState({
      openid:openid
    })
    axios.get(`${url}/novel/history/last`,{
      params:{
        openId:openid
      }
     })
    .then((res)=>{
      if (res.data.body) {
       this.setState({
        historytitle:res.data.body.title,
        historychapterId:res.data.body.chapterId,
        historynovelId:res.data.body.novelId
        })
      }else{
       this.setState({
        historyFlag:false
        })
      }

    })
    .catch((error)=>{
     console.log(error)
    })
    }
 }
 componentDidMount(){
  this.categoryFn(2)
  /*************读到第几章*************/

console.log(this.state.historyData)
 }
 /*************排行*************/
categoryFn=(type)=>{
   this.setState({
    loading:true
   })
  axios.get(`${url}/novel/order`,{
     params:{
       categoryId:type
     }
    })
   .then((res)=>{
   this.setState({
    manArr:res.data.body,
    loading:false
   })
   })
   .catch((error)=>{
    console.log(error)
   })
}
/*************点击更换颜色并请求数据*************/
 changeColor=(e)=>{
    var dom=e.currentTarget;
    changeActiveColor(dom)
    /*调用查询*/
    this.categoryFn(dom.getAttribute("data-category"))
    this.setState({
      category:dom.getAttribute("data-category")
    },function(){
       console.log(this.state.category)
    })
  }
 render(){
  return(
   <div className="homePage">
    <div className="container">
     <ul className="nav">
      <li> <Link to={this.state.openid?`/search?openid=${this.state.openid}`:"/search"}><img src={search}  alt="搜索"/><h4>搜索</h4></Link></li>
      <li> <Link to={this.state.openid?`/person?openid=${this.state.openid}`:"/person"}><img src={person} alt="个人中心" /><h4>个人中心</h4></Link></li>
      <li> <Link to={this.state.openid?`/pay?openid=${this.state.openid}`:"/pay"}><img src={coin} alt="充值" /><h4>充值</h4></Link></li>
      <li> <Link to={this.state.openid?`/history?openid=${this.state.openid}`:"/history"}><img src={book} alt="阅读历史" /><h4>阅读历史</h4></Link></li>
     </ul>
     <div className="category">
       <div className="left"><Link to={this.state.openid?`/rank?openid=${this.state.openid}`:"/rank"}>分类</Link></div>
       <div className="right"><Link to={this.state.openid?`/category?openid=${this.state.openid}`:"/category"}>排行</Link></div>
     </div>
     <ul className="book-list">
     {
      this.state.tjArr.map((item,index)=>{
       return(
        <li key={index}>
         <Link to={item.url}>
          <div className="book-list-top">
           <img src={item.img} alt={item.title} />
           <h3>{item.title}</h3>
           <p className="author">{item.author}</p>
          </div>
         </Link>
        </li>
        )
      })
     }
     </ul>
     <div className="changebtn">换一换<img src={changebtn} alt="换一换"/></div>
    </div>
    <div className="cardTitle">
      <div className="title"><b className="sep"></b>排行</div>
      <Link to={this.state.openid?`/category?openid=${this.state.openid}`:"/category"} className="more">更多<em className="arrow"></em></Link>
    </div>
    <ul className="ranking-tabs">
      <li onClick={this.changeColor} data-category="3">女生</li>
      <li onClick={this.changeColor} data-category="2" className="active">男生</li>
      <li  onClick={this.changeColor} data-category="4">出版</li>
    </ul>
    <div className="container">
       <ul className="book-list">
        {
         this.state.loading?<Loading />:
         this.state.manArr.slice(0,3).map((item,index)=>{
          return(
           <li key={index}>
            <b className="index">{index+1}</b>
            <Link to={this.state.openid?`/detail?id=${item.id}&openid=${this.state.openid}`:"/detail"}>
             <div className="book-list-top">
              <img src={item.novelcover} alt={item.name}/>
              <h3>{item.name}</h3>
              <p className="author">{item.author}</p>
             </div>
            </Link>
           </li>
           )
         })
        }
        {/*如果没有数据*/}
        { this.state.manArr.length<1&&<p>暂无更多内容</p>}
        </ul>
        <ul className="book-list-bottom">
        {
          /*如果数据超过十条*/
        this.state.manArr.length>10?
         this.state.manArr.slice(3,9).map((item,index)=>{
          return(
           <li key={index}>
            <Link  to={this.state.openid?`/detail?id=${item.id}&openid=${this.state.openid}`:"/detail"}>
              <span className="index">{index+4}.</span>
              <span className="tag">{item.category}</span>
              <span className="title">{item.name}</span>
              <span className="author f-fr">{item.author}</span>
            </Link>
           </li>
           )
         }):""
        }
        {
           /*如果数据超过3条*/
        this.state.manArr.length<10&&this.state.manArr.length>3?
         this.state.manArr.slice(3,this.state.manArr.length-1).map((item,index)=>{
          return(
           <li key={index}>
            <Link  to={item.id}>
              <span className="index">{index+4}.</span>
              <span className="tag">{item.category}</span>
              <span className="title">{item.name}</span>
              <span className="author f-fr">{item.author}</span>
            </Link>
           </li>
           )
         }):""
        }
       </ul>
       {this.state.manArr.length>10&&<Link className="btn-more" to={this.state.openid?`/category?openid=${this.state.openid}`:"/category"}>更多</Link>}
     </div>

     <div className={this.state.historyFlag?"copyright no-margin":"copyright"}>
       <p>江西江通文化传媒有限公司版权所有©2018</p>
       <p>赣ICP备17012908号</p>
     </div>
     {this.state.historyFlag&&<div className="lastReadTip">
      <Link to={this.state.openid?`/detail?openid=${this.state.openid}&chapter=${this.state.historychapterId}&id=${this.state.historynovelId}`:"/"}>
       <b className="icon icon-bookmarket"></b>
       <p className="desc">上次看到《{this.state.historytitle}》，点击继续</p>
       <b className="arrow"></b>
      </Link>
      </div>
    }
   </div>
   )
 }
}