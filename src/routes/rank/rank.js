import  React,{Component} from 'react';
import homeData from '../homPage/data';
import  {Link}from 'react-router-dom';
import axios from 'axios';
import {url} from '../../utils/href.js';
import GoHome from '../../compontents/goHome/goHome';
import {GetQueryString,changeActiveColor} from '../../utils/commit.js';
import './rank.css';

export default class Rank extends Component{
 constructor(props){
   super(props)
  /* novel分类板块novelData数据homeData小说列表*/
   this.state={
    serial:"全部",
    wordCount:"全部",
    category:"全部",
    serialId:"0",
    wordCountId:"0",
    categoryId:"0",
    novel:"2",
    show:true,
    novelData:[],
    homeData:[],
    openid:""
  }

 }
 componentDidMount(){
  let openid=GetQueryString("openid");
    this.setState({
      openid:openid
    })
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
   this.search()
 }
 getDataFn=(e)=>{
  let dom=e.currentTarget;
   changeActiveColor(dom);
   /*data-ga={currentSpan} data-id*/
   if (dom.getAttribute("data-ga")==="连载") {
     this.setState({
      serial:dom.innerHTML,
      serialId:dom.getAttribute("data-id")
     })
   }else if (dom.getAttribute("data-ga")==="字数") {
      this.setState({
      wordCount:dom.innerHTML,
      wordCountId:dom.getAttribute("data-id")
     })
   }else{
    this.setState({
      category:dom.innerHTML,
      categoryId:dom.getAttribute("data-id")
     })
   }

   /*serial:"全部",
    wordCount:"全部"
    category:"全部"*/
 }
  changeColor=(e)=>{
   let dom=e.currentTarget;
   changeActiveColor(dom)
   this.setState({
    novel:dom.getAttribute("data-category"),
    serial:"全部",
    wordCount:"全部",
    category:"全部",
    serialId:"0",
    wordCountId:"0",
    categoryId:"0"
   },function(){
     this.search()
   })
 }
 toggoleFn=(e)=>{
  let dom=e.currentTarget;
  this.setState({
   show:!this.state.show
  },()=>{
   if (this.state.show) {
      this.search()
    }
  })
 }

search=()=>{
  let categorys=this.state.serialId+","+this.state.wordCountId+","+this.state.categoryId;
  let categoryId=this.state.novel;

  axios.get(`${url}/category/novel/list`,{
     params:{
      categorys:categorys,
      categoryId:categoryId
     }
    })
   .then((res)=>{
      this.setState({homeData:res.data.body})
   })
   .catch((error)=>{
    console.log(error)
   })
}
 render(){
  return (
   <div id="rank">
   <GoHome />
    <ul className="ranking-tabs">
      <li onClick={this.changeColor} data-category="3">女生</li>
      <li onClick={this.changeColor} data-category="2" className="active">男生</li>
      <li onClick={this.changeColor} data-category="4">出版</li>
    </ul>
    <div className="fold-panel">
     <span className={this.state.show?"icon-unfold":"icon-unfold show"} onClick={this.toggoleFn}></span>
     {this.state.show?
      (this.state.novel!=="4"?
        <p>{this.state.serial}&nbsp;&nbsp;|&nbsp;&nbsp;{this.state.wordCount}&nbsp;&nbsp;|&nbsp;&nbsp;{this.state.category}</p>
         :<p>{this.state.category}</p>)
      :
     <div className="mask-box">
       {
       this.state.novelData.map((item,index)=>{
        return(
          <ul key={index}>
          {item.id==this.state.novel?
             item.childCategory.map((listItem,listIndex)=>{
              let as={"连载":"serial","字数":"wordCount","类型":"category"};
              let currentSpan=this.state[(as[listItem.name])]
              return(
                <li key={listIndex}>
                  <div className="select-label">{listItem.name}</div>
                  <div className="select-tags f-fl">
                  <span key="全部" className={currentSpan==="全部"?"active":""} onClick={this.getDataFn}  data-ga={listItem.name} data-id="0">全部</span>
                   {
                    listItem.childCategory.map((dataItem,listIndex)=>{
                     return(
                      <span onClick={this.getDataFn} key={dataItem.id} data-ga={listItem.name} data-id={dataItem.id} className={currentSpan===dataItem.name?"active":""}>{dataItem.name}</span>
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
           this.state.homeData.length>0?
          this.state.homeData.map((item,index)=>{
          return(
           <li key={index}>
            <Link className="link" to={`/detail?openid=${this.state.openid}&id=${item.id}`}>
              <div className="bookCover">
                <img src={item.novelcover} alt={item.name} />
              </div>
               <div className="bookDesc">
               <h3>{item.name}</h3>
                <div className="detail">
                  <span className="author">{item.author}</span>/<span className="readCount">
                  {
                    item.wordcount>10000?
                    (item.wordcount/10000).toFixed(1)+"万字" :
                    item.wordcount+"字"
                  }
                  </span>
                </div>
                <p className="desc">{item.description}</p>
               </div>
            </Link>
           </li>
           )
         })
          :
          <p>没有更多内容了</p>
        }
        </ul>
     </div>
    </div>
   )
 }
}