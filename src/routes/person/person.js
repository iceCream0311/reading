import  React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import GoHome from '../../compontents/goHome/goHome.js';
import './person.css'
import head  from '../../images/person-default.png';
import {GetQueryString} from '../../utils/commit.js';
import {url} from '../../utils/href.js';
export default class Person extends Component{

 constructor(props){
   super(props);
   this.state={
    head:"",
    id:"",
    user_name:"",
    score:0
    }
 }
  componentDidMount(){
    if (GetQueryString("openid")) {
      let openid=GetQueryString("openid")
       this.setState({
          openid:openid
        })
       axios.get(`${url}/user/info`,{
        params:{
          openid:openid
        }
       })
        .then((res)=>{
           this.setState({
                head:res.data.body.head_imgUrl,
                id:res.data.body.id_out,
                user_name:res.data.body.user_name,
                score:res.data.body.score
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

  }
 render (){
  return(
  <div className="pesron">
    <GoHome />
    <div className="profile container">
       <div className="img"><img src={this.state.head} alt="me" /></div>
     <div className="detail">
       <h2><span>{this.state.user_name}</span></h2>
       <p>您的账号ID:{this.state.id}</p>
     </div>
     </div>
     <ul className="pesron-list">
      <li className="recharge">
        <Link to={this.state.openid?`/pay?openid=${this.state.openid}`:"/pay"} >
          <div className="left"><i></i>&nbsp;&nbsp;充值</div>
          <div className="right"><span>余额 {this.state.score}阅币</span><span className="arrow"></span></div>
        </Link>
      </li>
      <li className="history">
        <Link to={this.state.openid?`/history?openid=${this.state.openid}`:"/history"}>
        <div className="left"><i></i>&nbsp;&nbsp;阅读历史</div><div className="right"><span className="arrow"></span></div>
        </Link>
      </li>
     </ul>
  </div>
)
 }
}
