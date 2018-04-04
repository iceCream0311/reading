let changeActiveColor=(dom)=>{
 var domLis=dom.parentNode.childNodes;
 var domClass=dom.getAttribute("class");
  for (let i = 0; i < domLis.length; i++) {
   let liClass=domLis[i].getAttribute("class")
   if (liClass&&liClass.indexOf("active")!==-1) {
     let liCurrentClass=liClass.replace("active","")
     domLis[i].setAttribute("class",liCurrentClass)
    }
   }
   /*添加当前类*/
 if(domClass&&domClass.indexOf("active")===-1){
  dom.setAttribute("class",domClass+" active")
 }else{
   dom.setAttribute("class","active")
 }
}
let  GetQueryString =(name)=> {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
export {
 changeActiveColor,
 GetQueryString
}