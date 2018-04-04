import  React,{Component} from 'react';
import {Link} from 'react-router-dom';
import GoHome from '../../compontents/goHome/goHome.js';
import './person.css'
import head  from '../../images/person-default.png';
import {GetQueryString} from '../../utils/commit.js';
export default class Person extends Component{
  componentDidMount(){
    if (GetQueryString("openid")) {
      alert("openid="+GetQueryString("openid"))
    }

  }
 render (){
  return(
  <div className="pesron">
    <GoHome />
    <div className="profile container">
       <div className="img"><img src={head} alt="me" /></div>
     <div className="detail">
       <h2><span>读书人</span></h2>
       <p>您的账号ID:np_JyhiKMRA2Q</p>
     </div>
     </div>
     <ul className="pesron-list">
      <li className="recharge">
        <Link to="/pay" >
          <div className="left"><i></i>&nbsp;&nbsp;充值</div>
          <div className="right"><span>余额 0阅点+200红包</span><span className="arrow"></span></div>
        </Link>
      </li>
      <li className="hongbao">
         <Link to="/hongbao">
          <div className="left"><i></i>&nbsp;&nbsp;我的红包</div><div className="right"><span className="arrow"></span></div>
         </Link>
      </li>
      <li className="history">
        <Link to="/history">
        <div className="left"><i></i>&nbsp;&nbsp;阅读历史</div><div className="right"><span className="arrow"></span></div>
        </Link>
      </li>
     </ul>
  </div>
)
 }
}
