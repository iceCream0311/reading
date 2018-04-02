import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import './pay.css';
export default class Pay extends Component {
  constructor(props){
    super(props)
    this.state={
      money:0
    }
  }
  selectedFn=(e)=>{
    e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
    var dom=e.currentTarget;
    var domLis=dom.parentNode.childNodes;
    var domClass=dom.getAttribute("class");
    /*去掉类名*/
    for (let i = 0; i < domLis.length; i++) {
      let liClass=domLis[i].getAttribute("class")
      if (liClass&&liClass.indexOf("selected")!==-1) {
        let liCurrentClass=liClass.replace("selected","")
        domLis[i].setAttribute("class",liCurrentClass)
       }
      }
      /*添加当前类*/
    if(domClass&&domClass.indexOf("selected")===-1){
     dom.setAttribute("class",domClass+" selected")
    }else{
      dom.setAttribute("class","selected")
    }
    this.setState({
      money:dom.getAttribute("data-money")
    },function(){
      console.log(this.state.money)
    })
  }
 render(){
  return(
   <div id="pay">
    <div className="account">
     <p>
      <em className="yd">0</em>
      阅点
      <span><em className="yd-s">+300</em>红包</span>
     </p>
     <Link to="/pay_detail">查看余额详情<span className="icon-arrow"></span></Link>
    </div>
    <div className="tip">
     <b className="icon-info"></b>
     充值赠送的红包有效期为7天，过期自动失效；消费时优先扣除距离过期时间最近的红包。(活动赠送红包以活动规则为准)
    </div>
    <div>
    <div className="recharge-list">
    <h4><b></b>选择充值金额<em>(100阅点/红包=1元)</em></h4>
    <ul className="f-cb">
      <li className="hot-first" onClick={this.selectedFn} data-money="9">
       <p className="money">9</p>
       <p>900阅点<em>+100包</em></p>
       <p className="hot">4000点</p>
      </li>
      <li  onClick={this.selectedFn} data-money="29">
      <p className="money">29</p>
      <p>2900阅点</p>
      <p className="hot">得2900阅点</p>
      </li>
      <li  onClick={this.selectedFn}  data-money="49">
       <p className="money">49</p>
       <p>900点<em className="hot">+100包</em></p>
       <p className="hot">8000阅点</p>
      </li>
      <li className="hot-li"  onClick={this.selectedFn} data-money="99">
       <p className="money">99</p>
       <p>9900阅点<em>+10100包</em></p>
       <p className="hot">20000阅点</p>
       </li>
      <li  onClick={this.selectedFn} data-money="200">
       <p className="money">200</p>
       <p className="yd">20000阅点</p>
       <p className="yd hot">得20000阅点</p>
      </li>
      <li  onClick={this.selectedFn} data-money="300">
       <p className="money">¥300</p><p className="yd">30000阅点</p>
       <p className="yd hot">得30000阅点</p>
      </li>
      <li className="hot-li"  onClick={this.selectedFn} data-money="399">
       <p className="money">¥399</p>
       <p className="yd">&nbsp;<em>包1年畅读！</em></p>
      </li>
      <li  onClick={this.selectedFn} data-money="400">
        <p className="money">¥400</p>
        <p>40000阅点</p>
        <p className="hot">得40000阅点</p>
      </li>
      </ul>
    </div>
    <div className="optional">
     <p>微信账户余额不足?</p>
     <p className="go-pay">他人代充<span className="icon-arrow"></span></p>
    </div>
   </div>
  </div>
   )
 }
}