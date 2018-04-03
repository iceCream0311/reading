import React, { Component} from 'react';
import  {Link}from 'react-router-dom';
import  './homePage.css';
import search from '../../images/search.png';
import person from '../../images/person.png';
import coin from '../../images/coin.png';
import book from '../../images/book.png';
import tj1 from '../../images/tj1.jpg';
import tj2 from '../../images/tj2.jpg';
import tj3 from '../../images/tj3.jpg';
import man1 from '../../images/man1.jpg';
import man2 from '../../images/man2.jpg';
import man3 from '../../images/man3.jpg';
import changebtn from '../../images/change.png';
import homeData from './data.js';
import {changeActiveColor} from '../../utils/commit.js';
export default class HomePage extends Component {
 constructor(props){
   super(props);
   this.state={
    category:"man",
    tjArr:[
     {url:"/",img:tj1,title:"总裁欺上身，娇妻晚上见",author:"琪安"},
     {url:"/",img:tj2,title:"最强兵痞",author:"二斗"},
     {url:"/",img:tj3,title:"腹黑陆少你太坏",author:"江枫眠"}
     ],
      manArr:[
     {url:"/",img:man1,title:"官途：权色撩人",author:"丁公子"},
     {url:"/",img:man2,title:"官路",author:"钓人的鱼"},
     {url:"/",img:man3,title:"一号秘书：陆一伟传奇",author:"万路之遥"}
     ]
    }
 }
 changeColor=(e)=>{
    var dom=e.currentTarget;
    changeActiveColor(dom)
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
      <li> <Link to="/search"><img src={search}  alt="搜索"/><h4>搜索</h4></Link></li>
      <li> <Link to="/person"><img src={person} alt="个人中心" /><h4>个人中心</h4></Link></li>
      <li> <Link to="/pay"><img src={coin} alt="充值" /><h4>充值</h4></Link></li>
      <li> <Link to="/history"><img src={book} alt="阅读历史" /><h4>阅读历史</h4></Link></li>
     </ul>
     <div className="category">
       <div className="left"><Link to="/rank">分类</Link></div>
       <div className="right"><Link to="/category">排行</Link></div>
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
      <Link to="category" className="more">更多<em className="arrow"></em></Link>
    </div>
    <ul className="ranking-tabs">
      <li onClick={this.changeColor} data-category="woman">女生</li>
      <li onClick={this.changeColor} data-category="man" className="active">男生</li>
      <li  onClick={this.changeColor} data-category="ca">出版</li>
    </ul>
    <div className="container">
       <ul className="book-list">
        {
         this.state.manArr.map((item,index)=>{
          return(
           <li key={index}>
            <b className="index">{index+1}</b>
            <Link to={item.url}>
             <div className="book-list-top">
              <img src={item.img} alt={item.title}/>
              <h3>{item.title}</h3>
              <p className="author">{item.author}</p>
             </div>
            </Link>
           </li>
           )
         })
        }
        </ul>
        <ul className="book-list-bottom">
        {
         homeData.slice(3,9).map((item,index)=>{
          return(
           <li key={index}>
            <Link  to="">
              <span className="index">{index+4}.</span>
              <span className="tag">{item.category}</span>
              <span className="title">{item.title}</span>
              <span className="author f-fr">{item.author}</span>
            </Link>
           </li>
           )
         })
        }
       </ul>
       <Link className="btn-more" to="category">更多</Link>
     </div>
     <div className="copyright">
       <p>杭州酷炫书城信息技术有限公司版权所有©2017-2018</p>
       <p>浙ICP备17039369号</p>
     </div>
     <div className="lastReadTip">
      <Link to="/">
       <b className="icon icon-bookmarket"></b>
       <p className="desc">上次看到《兵王都市传奇》，点击继续</p>
       <b className="arrow"></b>
      </Link>
     </div>
   </div>
   )
 }
}