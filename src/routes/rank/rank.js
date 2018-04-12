import  React,{Component} from 'react';
import homeData from '../homPage/data';
import  {Link}from 'react-router-dom';
import axios from 'axios';
import {url} from '../../utils/href.js';
import GoHome from '../../compontents/goHome/goHome';
import {changeActiveColor} from '../../utils/commit.js';
import {categorys} from './categoryDtata.js';
import './rank.css';

export default class Rank extends Component{
 constructor(props){
   super(props)
  /* novel分类板块novelData数据*/
   this.state={
    serial:"全部",
    wordCount:"全部",
    category:"全部",
    novel:"男生",
    show:true,
    novelData:[]
  }
 }
 componentDidMount(){
  axios.get(`${url}/novel/category/list`,{
     params:{
      type:"1"
     }
    })
   .then((res)=>{
      this.setState({
        novelData:res.data.body
      })
   })
   .catch((error)=>{
    console.log(error)
   })
 }
  changeColor=(e)=>{
   let dom=e.currentTarget;
   changeActiveColor(dom)
   this.setState({
     novel:dom.getAttribute("data-category")
   },function(){
     console.log(this.state.novel)
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
      <li onClick={this.changeColor} data-category="女生">女生</li>
      <li onClick={this.changeColor} data-category="男生" className="active">男生</li>
      <li onClick={this.changeColor} data-category="出版">出版</li>
    </ul>
    <div className="fold-panel">
     <span className={this.state.show?"icon-unfold":"icon-unfold show"} onClick={this.toggoleFn}></span>
     {this.state.show?
     <p>{this.state.serial}&nbsp;&nbsp;|&nbsp;&nbsp;{this.state.wordCount}&nbsp;&nbsp;|&nbsp;&nbsp;{this.state.category}</p>
      :
     <div className="mask-box">
       {
       this.state.novelData.map((item,index)=>{
        return(
          <ul>
          {item.name==this.state.novel?
             item.childCategory.map((listItem,listIndex)=>{
              return(
                <li key={index}>
                  <div className="select-label">{listItem.name}</div>
                  <div className="select-tags f-fl">
                  <span key="全部">全部</span>
                   {
                    listItem.childCategory.map((dataItem,listIndex)=>{
                     let currentSpan=this.state[dataItem["name"]];
                     return(
                      <span key={dataItem.value} className={currentSpan===dataItem.name?"active":""}>{dataItem.name}</span>
                      )
                    })
                    }
                  </div>
                </li>
              )
            })
            :""

          }
        </ul>


         )
       })
       }
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