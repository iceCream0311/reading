import React, { Component} from 'react';
import './test.css';
import '../../utils/wxLogin.js'


export default class Test extends Component {
 componentDidMount(){

 }
 getFn=()=>{
 window.location.replace(
'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx57cfabeea947cb40&redirect_uri=http%3a%2f%2fwx.devtop.top%2fwx&response_type=code&scope=snsapi_userinfo&#wechat_redirect' )
 }
 render(){
  return(
    <div id="test">
     <p>第一步，获取code</p>
      <button id="btn1">用微信登录</button>
      <p>获取code</p>
      <button id="btn2">获取code</button>
      token:<p id="token"></p>
      openid:<p id="openid"></p>
      <p>获取用户信息</p>
      <button id="btn3" onClick={this.getFn}>获取用户信息</button>
      <p>姓名：</p><p id="name"></p>
      <p>头像：</p><img src="" id="img" />
    </div>
   )
 }
}