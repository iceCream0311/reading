import  React,{Component} from 'react';
import homeData from '../homPage/data';
import  {Link}from 'react-router-dom';
import GoHome from '../../compontents/goHome/goHome';
import {changeActiveColor} from '../../utils/commit.js';

export default class Rank extends Component{
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
  return (
   <div>
   <GoHome />
    <ul className="ranking-tabs">
      <li onClick={this.changeColor}>女生</li>
      <li onClick={this.changeColor} className="active">男生</li>
      <li onClick={this.changeColor}>出版</li>
    </ul>
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