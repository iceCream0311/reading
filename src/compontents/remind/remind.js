import React,{Component} from 'react';
import   './remind.css';

export default class Remind extends Component{
 constructor(props){
     super(props);
     this.state={
      flag:false
     }
}
 componentDidMount(){
 setTimeout(
  ()=>{
    if ( document.querySelector("#remind")) {
       document.querySelector("#remind").className="fadein"
    }

 },500)
}
 render(){
  return(
   <div id="remind">
   {this.props.remind}

   </div>
   )
 }
}