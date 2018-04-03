import React,{Component} from 'react';
import GoHome from '../../compontents/goHome/goHome.js';
import {data} from './data.js';
import './hongbao.css';
 export default  class HongBao extends Component{
  /*更改日期展示*/
  logchangeDate=(strDate)=> {

    var date = new Date(strDate);
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();
    if ((date.getMonth() + 1).toString().length == 1) {
        month = 0 + month;
    }
    if (date.getDate().toString().length == 1) {
        day = 0 + day;
    }
    if (date.getHours().toString().length == 1) {
        hour = 0 + hour;
    }
    if (date.getMinutes().toString().length == 1) {
        minute = 0 + minute;
    }
    var dateStr = month + "-" + day + " " + hour + ":" + minute;
    if ("0"+((new Date()).getMonth() + 1)===month&&("0"+(new Date()).getDate())===day) {
      dateStr = hour + ":" + minute;
    }
    if (dateStr === "NaN-NaN-NaN NaN:NaN") {
     dateStr = "";
    }
    return dateStr;
  };
  render(){
   console.log(data)
  return(
    <div className="hongbao">
     <GoHome />
     <div className="header"><h3>{data.payTotalLoad.remainingNum}</h3><p>红包剩余</p></div>
     <div class="content">
     <div class="hongbaoList">
      <h3>红包过期时间</h3>
      <ul className="container">
      {
       data.payLoad.map((item,index)=>{
        return(
         <li>
          <span>{this.logchangeDate(item.endtime-0)}</span>
          <span>+{item.balance}</span>
          <span>签到红包{item.expireDays}天</span>
         </li>
        )
       })
      }
      </ul>
    </div>
    <div class="hongbaoList">
      <h3>已过期红包</h3>
      <ul className="container">
      {
       data.payoldLoad.map((item,index)=>{
        return(
         <li>
          <span>{this.logchangeDate(item.endtime-0)}</span>
          <span>+{item.balance}</span>
          <span>签到红包{item.expireDays}天</span>
         </li>
        )
       })
      }
      </ul>
    </div>
   </div>
   </div>
   )
  }
 }