import  React,{Component} from 'react';
import homeData from '../homPage/data';
import  {Link}from 'react-router-dom';
import GoHome from '../../compontents/goHome/goHome';
import {changeActiveColor} from '../../utils/commit.js';
import {categorys} from './categoryDtata.js';
import './rank.css';

export default class Rank extends Component{
 constructor(props){
  super(props)
  this.state={
  serial:"全部",
  wordCount:"全部",
  category:"全部",
   show:true
  }
 }
  changeColor=(e)=>{
   let dom=e.currentTarget;
   changeActiveColor(dom)
   this.setState({
     category:dom.getAttribute("data-category")
   },function(){
     console.log(this.state.category)
   })
 }
 toggoleFn=(e)=>{
  let dom=e.currentTarget;
  this.setState({
   show:!this.state.show
  },function(){console.log(this.state.show)})

 }
 render(){
  return (
   <div>
   <GoHome />
    <ul className="ranking-tabs">
      <li onClick={this.changeColor}>女生</li>
      <li onClick={this.changeColor} className="active">男生</li>
      <li onClick={this.changeColor}>出版</li>
    </ul>
    <div className="fold-panel">
     <span className={this.state.show?"icon-unfold":"icon-unfold show"} onClick={this.toggoleFn}></span>
     {this.state.show?
     <p>{this.state.serial}&nbsp;&nbsp;|&nbsp;&nbsp;{this.state.wordCount}&nbsp;&nbsp;|&nbsp;&nbsp;{this.state.category}</p>
      :
     <div className="mask-box">
      <ul>
       {
       categorys.params.map((item,index)=>{
        return(
          <li key={index}>
          <div className="select-label">{item.desc}</div>
          <div className="select-tags f-fl">

          {
           item.list.map((listItem,listIndex)=>{
            let currentSpan=this.state[item["type"]];
            return(
             <span key={listItem.value} className={currentSpan===listItem.desc?"active":""}>{listItem.desc}</span>
             )
           })
          }
          </div>
       </li>
         )
       })
       }
      </ul>
     </div>
     }
    </div>
    <div className="container">
       <ul className="book-list">
        {
          homeData.slice(0,3).map((item,index)=>{
          return(
           <li key={index}>
            <b className="index">{index+1}</b>
            <Link to={item.sourceUuid}>
             <div className="book-list-top">
              <img src={item.cover} alt={item.title} />
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
         homeData.slice(3,20).map((item,index)=>{
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
     </div>
    </div>
   )
 }
}