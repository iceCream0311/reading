import React, { Component} from 'react';
import  './search.css';
import GoHome from '../../compontents/goHome/goHome';
export default class Search extends Component {
 constructor(props){
  super(props)
  this.state={
    values:"",
   lsArr:[],
   data:{
    "hots":[
    "哑舍","三国机密","刺杀骑士团长","金庸作品全集","神医嫡女","方外：消失的八门","房思琪的初恋乐园","罪恶调查局","当我足够美，才能留住你","妖猫传","侯沧海商路笔记"
    ],
    "hint":"国家行动"
   }
  }
 }
 componentDidMount(){
 this.historyList("")
 }
 searche=(e)=>{
  if (e.which !== 13) return
  let str= e.currentTarget.value;
  this.historyList(str)
 }
 historyList=(str)=>{
  let newLs="";
  let ls=localStorage.getItem("search_Keys");
  let flag=false;
  if (ls&&ls.length) {
   /*判断是否已经含有*/
   if (ls.split(",").length>1) {
    let lsArr=ls.split(",");
     this.setState({
      lsArr:lsArr
     })
    for (let i = 0; i < lsArr.length; i++) {
     if (lsArr[i]===str) {
      flag=true
     }
    }
    if (!flag) {
     newLs=ls+","+str;
      this.setState({
       lsArr:lsArr.push("str")
     })
    }else{
     newLs=ls;
    }
   }
   else if (ls!==str) {
    newLs=ls+","+str;
     this.setState({
     lsArr:[ls,str]
    })
   }
  }else{
   newLs=str
   if (str) {
    this.setState({
     lsArr:[str]
    })
   }

  }
  /*设置本地存储*/
  localStorage.setItem("search_Keys", newLs);
 }
 emptyFn=()=>{
  document.querySelector("#search-input").value=""
   }
clearFn=()=>{
 if (localStorage.getItem("search_Keys")) {
   localStorage.removeItem("search_Keys")
 }
 this.setState({
     lsArr:[]
    })
}
/*点击更改input值*/
searchInpt=(e)=>{
  this.setState({value:e.target.innerHTML});
  document.getElementById("search-input").value=e.target.innerHTML;
  this.historyList(e.target.innerHTML)
}
/*点击更改input值*/
changeText=(e)=>{
  this.setState({value:e.target.values});
  this.historyList(e.target.values)
  /*搜索*/
};
 render(){
  return(
   <div id="search">
    <GoHome />
    <div className="search-input">
     <div className="inner">
      <b className="icon icon-search"></b>
      <input type="text" id="search-input" name="key"  onBlur={this.changeText} placeholder={this.state.data.hint} onKeyPress={this.searche}/>
      <b className="icon icon-delete" onClick={this.emptyFn}></b>
     </div>
    </div>
    <section className="search-key">
     <dl className="keys-wrap">
      <dt>热搜</dt>
      <dd className="lines-3">
       {this.state.data.hots.map((item,index)=>{
        return <span key={index} onClick={this.searchInpt}>{item}</span>
       })
        }
      </dd>
     </dl>
     <dl className="keys-wrap">
      <dt>历史<b className="icon icon-clear" onClick={this.clearFn}></b></dt>
      <dd className="lines-2">
       {this.state.lsArr.length?
        this.state.lsArr.map((item,index)=>{
        return <span key={index} onClick={this.searchInpt}>{item}</span>
        }):""
        }
      </dd>
     </dl>
    </section>
   </div>
   )
 }
}