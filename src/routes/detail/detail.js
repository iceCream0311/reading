import React,{Component}  from 'react';
import  {Link}from 'react-router-dom';
import  './detail.css';
import axios from 'axios';
import {url} from '../../utils/href.js';
import {GetQueryString,changeActiveColor} from '../../utils/commit.js';
import Remind from '../../compontents/remind/remind';
export default class Detail extends Component {
 constructor(props){
     super(props);
    /* novelId:文章id chapterId:文章章节 openid:用户id loading:加载显示  chaptercount:章节总数 themFlag:风格设置是否展示*/
   /* payData余额和支付信息*/
     this.state={
      novelId:1,
      chapterId:0,
      openid:null,
      loading:false,
      themFlag:false,
      them:"btn-theme-light",
      content:"",
      title:"",
      remind:"已经是第一章",
      remindFlag:true,
      chaptercount:1,
      isPay:1,
      payData:{
        payment:0,
        userscore:0
      }
   }
  }
   componentWillMount(){
    let them=localStorage.getItem("reader_theme");
    let chapter=GetQueryString("chapter");
    /*默认颜色*/
    if (them) {
      this.setState({
        them:them
      })
    }
    if (chapter) {
      this.setState({
        chapterId:chapter
      })
    }
    let openid=GetQueryString("openid");
    let novelId=GetQueryString("id");
    this.setState({
      openid:openid,
      novelId:novelId
    })
}
 componentDidMount(){
  /*默认章节*/
  this.searchData()
 }
 /* 搜索章节*/
 searchData=()=>{
  let novelId=this.state.novelId;
  let chapterId=this.state.chapterId;
  let openid=this.state.openid;
  axios.get(`${url}/novel/content`,{
     params:{
       novelId:novelId,
       openId:openid,
       chapterId:chapterId,
     }
  })
   .then((res)=>{

    this.setState({
      title:res.data.body.title,
      content:res.data.body.content,
      chapterId:res.data.body.chapterId,
      chaptercount:res.data.body.lastchapterId,
      isPay:res.data.body.isPay
    },()=>{
      if (!res.data.body.isPay) {
        let contentData=res.data.body.content;
        let content =contentData.indexOf("</p>",2)
        let content1 =contentData.indexOf("<p>")
        content=contentData.substring(content1,content)
         this.setState({
          content:content
        })
          axios.get(`${url}/novel/chapter/pay/info`,{
             params:{
               novelId:novelId,
               openId:openid,
               chapterId:chapterId,
             }
          })
          .then((res)=>{
            console.log(res);
            this.setState({
               payData:{
                 payment:res.data.body.payment,
                 userscore:res.data.body.userscore
               }
            })
          })
          .catch((error)=>{
           console.log(error)
          })
      }else{
        this.setState({
          content:res.data.body.content
        })
      }
    })

   })
   .catch((error)=>{
    console.log(error)
   })
 }
/* 上一章*/
 preFn=()=>{
  if (this.state.chapterId<=1) {
    this.setState({
    remindFlag:false,
    remind:"已经是第一张了"
    })
    setTimeout(
      () => {
        this.setState({
          remindFlag:true
        })
      },
      2000
    );
  }else{
    this.setState({
      chapterId:(this.state.chapterId-1)
    },()=>{
      this.searchData();
      this.node.scrollIntoView();
    })
  }
 }
 /* 下一章*/
  nextFn=()=>{
    if (this.state.chapterId===this.state.chaptercount) {
       this.setState({
       remindFlag:false,
       remind:"已经是最后一张"
       })
       setTimeout(
         () => {
           this.setState({
             remindFlag:true
           })
         },
         2000
       );
     }else{
        this.setState({
         chapterId:(this.state.chapterId+1)
       },()=>{
         this.searchData()
         this.node.scrollIntoView();
       })
     }
  }
  unlockFn=()=>{
    let novelId=this.state.novelId;
    let chapterId=this.state.chapterId;
    let openid=this.state.openid;
    axios.get(`${url}/novel/chapter/pay`,{
       params:{
         novelId:novelId,
         openId:openid,
         chapterId:chapterId,
       }
    })
    .then((res)=>{
     /* 1000：购买成功；1001：用户账户余额不足;2001:购买异常，请重试！*/
      if(res.data.body.status===0){
        if (res.data.body.code===1001) {
          alert("账户余额不足,请充值")
           this.props.history.push('/pay?openid='+openid)
        }else if(res.data.body.code===1000) {
           this.setState({
             isPay:1,
             remindFlag:false,
             remind:"解锁成功"
             })
             setTimeout(
               () => {
                 this.setState({
                   remindFlag:true
                 })
               },
               2000
            );
          this.searchData()
        }else{
          alert("购买异常，请重试")
        }
      }else{
        this.setState({
           isPay:1,
           remindFlag:false,
           remind:"解锁成功"
           })
           setTimeout(
             () => {
               this.setState({
                 remindFlag:true
               })
             },
             2000
          );
        this.searchData()
      }
    })
    .catch((error)=>{
     console.log(error)
    })
  }
 themChange=()=>{
  this.setState({
    themFlag:!this.state.themFlag
  },()=>{
   console.log(document.querySelectorAll(".m-setting-group span"))
  })
 }
 changeThemFn=(e)=>{
  let them=e.currentTarget.getAttribute("data-them")
  localStorage.setItem("reader_theme",them);
  changeActiveColor(e.currentTarget)
  this.setState({
   them:them
  })
 }
 render(){
  return(
    <div id="detail" className={this.state.them} ref={node => this.node = node}>
      {!this.state.remindFlag&&<Remind remind={this.state.remind}/>}
      <div className="container">
        <h2>{this.state.title}</h2>
        <div dangerouslySetInnerHTML={{__html:this.state.content}}></div>
        <div className="f-cb">
          <span onClick={this.nextFn} className="f-fl btn-next btn--light">下一章</span>
          <span className="f-fr btn-setting btn--light-active-stroke" onClick={this.themChange}>设置</span>
         {this.state.themFlag&&
          <div className="m-setting-group">
            <span onClick={this.changeThemFn} data-them="btn-theme-light" className="active"></span>
            <span onClick={this.changeThemFn} data-them="btn-theme-blue"></span>
            <span onClick={this.changeThemFn} data-them="btn-theme-yellow"></span>
            <span onClick={this.changeThemFn} data-them="btn-theme-dark"></span>
          </div>
         }
        </div>
        <div className="btn-list">
          <Link to={`/detail_list?id=${this.state.novelId}&openid=${this.state.openid}`}>目录</Link>
          <Link to={this.state.openid?`/history?openid=${this.state.openid}`:"/history"}>阅读历史</Link>
          <Link to={this.state.openid?`/pay?openid=${this.state.openid}`:"/pay"} className="acitve">充值</Link>
          <span onClick={this.preFn}>上一章</span>
          <Link to={this.state.openid?`/?openid=${this.state.openid}`:"/"}>首页</Link>
          <Link to={this.state.openid?`/rank?openid=${this.state.openid}`:"/rank"}>更多都市生活</Link>
          <Link to="/">打开自动购买</Link>
          <Link to={this.state.openid?`/detail_book?id=${this.state.novelId}&openid=${this.state.openid}`:`/detail_book?id=${this.state.novelId}`}>详情页面</Link>
          <Link to={this.state.openid?`person?openid=${this.state.openid}`:"/person"}>个人中心</Link>
        </div>
      </div>

      <div className={!this.state.isPay?"m-layer-container show":"m-layer-container"}>
          <div className="m-layer">
            <div className="m-info">
              <h3>支持作者创作，解锁后继续阅读</h3>
              <p className="price">解锁本章：<em>{this.state.payData.payment}</em>阅读币</p>
              <p><span className="balance">阅点余额：<em>{this.state.payData.userscore}</em>阅读币</span></p>
            </div>
            <div className="m-action">
            <div className="m-btns">
              <span className="btn-buy btn--light-active" onClick={this.unlockFn}>解 锁</span>
            </div>
          </div>
        </div>
      </div>
      {/*<div className="tj">
        <h3><em className="sep"></em>作者推荐</h3>
        <div className='content'>
          <Link to="link">邻座的男乘客太坏，要帮忙解除我的“凶兆”</Link>
          <Link to="link">老婆太撩人，短裙下竟然藏了这个秘密？</Link>
          <Link to="link">办公室的门还开着，她竟伸手紧紧握住我的小弟弟</Link>
          <Link to="link">做了她的24小时保镖，每天晚上偷看她在浴室里……</Link>
        </div>
      </div>*/}
    </div>
  )
 }
}