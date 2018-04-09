import  React,{Component} from 'react';
import axios from 'axios';
import {url} from '../../utils/href.js';
import  {Link}from 'react-router-dom';
import homeData from '../homPage/data';
import GoHome from '../../compontents/goHome/goHome';
import {changeActiveColor,GetQueryString} from '../../utils/commit.js';
import Loading from '../../compontents/loading/loading';
export default class CategoryPage extends Component{
  constructor(props){
    super(props);
    this.state={
     category:"man",
     openid:null,
     loading:false,
     manArr:[]
    }
  }
  componentWillMount(){
    let openid=GetQueryString("openid");
    this.setState({
      openid:openid
    })
  }
  componentDidMount(){

    this.categoryFn(2)
      /*let id=this.props.match.params.id*/
  }
  categoryFn=(type)=>{
     this.setState({
      loading:true
     })
    axios.get(`${url}/novel/order`,{
       params:{
         categoryId:type
       }
      })
     .then((res)=>{
     this.setState({
      manArr:res.data.body,
      loading:false
     })
     })
     .catch((error)=>{
      console.log(error)
     })
  }
   changeColor=(e)=>{
    var dom=e.currentTarget;
    changeActiveColor(dom)
    this.categoryFn(dom.getAttribute("data-category"))
    this.setState({
      category:dom.getAttribute("data-category")
    })
  }
 render(){
  return (
   <div>
   <GoHome />
    <ul className="ranking-tabs">
      <li onClick={this.changeColor} data-category="3">女生</li>
      <li onClick={this.changeColor} data-category="2" className="active">男生</li>
      <li onClick={this.changeColor} data-category="4"> 出版</li>
    </ul>
    <div className="container">
       <ul className="book-list">
        {/*如果没有数据*/}
        { this.state.manArr.length<1&&<p>暂无更多内容</p>}
        {
          this.state.loading?<Loading />:
          this.state.manArr.slice(0,3).map((item,index)=>{
            return(
             <li key={index}>
              <b className="index">{index+1}</b>
              <Link to={this.state.openid?`/detail?id=${item.id}&openid=${this.state.openid}`:"/detail"}>
               <div className="book-list-top">
                <img src={item.novelcover} alt={item.name} />
                <h3>{item.name}</h3>
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
         this.state.manArr.slice(3,20).map((item,index)=>{
          return(
           <li key={index}>
            <Link  to={this.state.openid?`/detail?id=${item.id}&openid=${this.state.openid}`:"/detail"}>
              <span className="index">{index+4}.</span>
              <span className="tag">{item.category}</span>
              <span className="title">{item.name}</span>
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