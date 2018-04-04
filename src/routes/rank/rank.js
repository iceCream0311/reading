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
  categorys:"",
   show:true
  }
 }
  changeColor=(e)=>{
   let dom=e.currentTarget;
   changeActiveColor(dom)
   this.setState({
     categorys:dom.getAttribute("data-category")
   },function(){
     console.log(this.state.categorys)
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
   <div id="rank">
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
       <ul className="book-category">
        {
          homeData.map((item,index)=>{
          return(
           <li key={index}>
            <Link className="link" to={item.sourceUuid}>
              <div className="bookCover">
                <img src={item.cover} alt={item.title} />
              </div>
               <div className="bookDesc">
               <h3>{item.title}</h3>
                <div className="detail">
                  <span className="author">{item.author}</span>/<span className="readCount">{item.totalCount}</span>
                </div>
                <p className="desc">{item.description}</p>
               </div>
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