import React, { Component} from 'react';
import  {Link}from 'react-router-dom';
import  './homePage.css';
import search from '../../images/search.png';
import person from '../../images/person.png';
import coin from '../../images/coin.png';
import book from '../../images/book.png';
import tj1 from '../../images/tj1.jpg';
import tj2 from '../../images/tj2.jpg';
import tj3 from '../../images/tj3.jpg';
import man1 from '../../images/man1.jpg';
import man2 from '../../images/man2.jpg';
import man3 from '../../images/man3.jpg';
import changebtn from '../../images/change.png';
export default class HomePage extends Component {
 constructor(props){
   super(props);
   this.state={
    tjArr:[
     {url:"/",img:tj1,title:"总裁欺上身，娇妻晚上见",author:"琪安"},
     {url:"/",img:tj2,title:"最强兵痞",author:"二斗"},
     {url:"/",img:tj3,title:"腹黑陆少你太坏",author:"江枫眠"}
     ],
      manArr:[
     {url:"/",img:man1,title:"官途：权色撩人",author:"丁公子"},
     {url:"/",img:man2,title:"官路",author:"钓人的鱼"},
     {url:"/",img:man3,title:"一号秘书：陆一伟传奇",author:"万路之遥"}
     ],
     list:[
     {"totalCount":"413.8万","serial":true,"author":"丁公子","title":"官途：权色撩人","cover":"https://easyreadfs.nosdn.127.net/nfb.367f3edaa4ff43009f5528734428d969.jpg","sourceUuid":"np_dH49e8QQ2HH_-WkkK2l7yxPYcaGvMyErP3nJFNlwoa1VJQ","category":"官场职场","description":"智谋如妖，仕途之路争斗不断，一路横推对手，平步青云。青云之路，美人环绕，一路开到荼靡。不断登临权力之巅，财富、美色纷至沓来，各色人物粉墨登场。人生如戏，戏如人生。欲知官妖如何决胜千里，请看官场草根的逆袭之路。"},
     {"totalCount":"582.2万","serial":true,"author":"钓人的鱼","title":"官路","cover":"https://easyreadfs.nosdn.127.net/nfb.6f2095f2bae84da5855888d7875e35ce.jpg","sourceUuid":"np_IilrLMlB3n-s-Dp0K2ovmUiLI679OikmbS2YE49z_a1VJQ","category":"官场职场","description":"为官者，踏出一步，就是一个脚印，对了，那是份内之事，错了，前面就是万丈深渊；本书的姊妹篇，也可以说是《官梯》的续集，《村长的妖孽人生》正在网易云阅读火热连载，《官梯》里没有交代的事这里都会交代清楚，敬请观赏。http://yuedu.163.com/source/1b7140a1bb4e4ec3bcbb08e5e0093cee_4另有完本作品《国色天香》也在网易云阅读。"},
     {"totalCount":"366.9万","serial":true,"author":"万路之遥","title":"一号秘书：陆一伟传奇","cover":"https://easyreadfs.nosdn.127.net/novel_c2408b035eca4fa199ff1f633bd0d756.jpeg","sourceUuid":"np_c3xtL8lH3XCs_WshKz8kyRPfJK-tP3Ioai-cF49-qftVJQ","category":"官场职场","description":"陆一伟，一个铁骨铮铮，有血有肉的七尺男儿，他心系群众，种植果园不忘百姓，舍弃己利无偿捐赠；他侠骨仁心，兄弟落难两肋插刀，重情重义肝胆相照；他饱尝妻离子散、亲友远离的人间冷暖，面对爱情、友情、亲情的抉择，却另辟蹊径，重新打开了通往成功的大门。这是一部充满正能量的写实小说，一部小人物百折不挠、不卑不亢的心路历程，用打脱牙和血吞的毅力书写着平凡的人生。此文谨献给奋斗路上的你我，一起见证一段不一样的奋斗历程……qq:406002220，欢迎大家一起交流探讨。"},
     {"totalCount":"683.6万","serial":true,"author":"我自对天笑","title":"兵王都市传奇","cover":"https://easyreadfs.nosdn.127.net/nfb.f9bc2c574e6948d3bb0a60d11c5128c3.jpg","sourceUuid":"np_KHw4K85J3Xas_zhwKzl5yBCNJquoPHQrOHzKE4p3rKlVJQ","category":"都市生活","description":"雇佣兵王陈扬回归都市，只为保护战友的女神妹妹。繁华都市里，陈扬如鱼得水，逍遥自在。且看一代兵王如何用铁拳和智慧打下一片商业帝国……欲了解四帝更多故事，请微信公众号搜索天道盟。"},
     {"totalCount":"325.6万","serial":true,"author":"风语","title":"桃色官路：情陷女领导","cover":"https://easyreadfs.nosdn.127.net/nfb.4d38cd27236c4c2fb6d51f15ae49f964.jpg","sourceUuid":"np_cCk5fsVGinSg_Th3Kz54yxDdfvzyayMobS6bSNd_qfJVJQ","category":"官场职场","description":"国税局小科员凌正道，因不够圆滑，在工作中被一直打压。一天醉酒后，他无意间撞破了副局长唐立君与县委书记夫人赵丽然的秘密，被唐局长从征税科调到办公室工作……自此，他开始了真正的仕途之路，各色各样的美女也接踵而来，令人眼花缭乱！"},
     {"totalCount":"152.8万","serial":true,"author":"南无袈裟理科佛","title":"夜行者：平妖二十年","cover":"https://easyreadfs.nosdn.127.net/novel_0114ebfd5fa345c587183ba972dd16ce.jpeg","sourceUuid":"np_IyxjJc9F2X-srjl1K2t7zBCMJP3-MyN7Y3zLQdd1q_5VJQ","category":"悬疑探险","description":"“苗疆三部曲”作者南无袈裟理科佛新作。\r\n“人之假造为妖，物之性灵为精，人魂不散为鬼。天地乖气，忽有非常为怪，神灵不正为邪，人心癫迷为魔，偏向异端为外道。”\r\n南漂青年侯漠，在98年的一次变故之中，发现自己身上藏着夜行者的血脉，而且还是十分特殊的“灵明石猴”，这是一种遭受上天诅咒的血脉，有着活不过三十的基因缺陷，为了活下去，他不得不从踏入那个前所未闻的江湖岁月，拼命挣扎。\r\n七大妖穴、游侠联盟、民国十大高手与清朝遗老的恩怨、诡异纷繁的民间传说和让人为之心悸的乡野秘闻，城市之中的迷藏，还有最骇人听闻的黄泉引，你有所耳闻却从未了解过的真相，所有一切，尽在《夜行者：平妖二十年》！\r\n"},
     {"totalCount":"394.2万","serial":true,"author":"风流小二","title":"美女总裁的特种保镖","cover":"https://easyreadfs.nosdn.127.net/nfb.5c3d364658b546849bc1a9e13b13a10c.jpg","sourceUuid":"np_cCZtJcxAi3aqrjN3K297zkjYf6-pPCl8Y3_IQt93-_hVJQ","category":"都市生活","description":"【年度最畅销的都市大作】叶凌天，神秘部队退伍军人，为了给妹妹凑集五十万的治疗费用不得不给三元集团的千金小姐李雨欣当贴身保镖。且看经历过太多生死的铮铮硬汉叶凌天如何在这个繁华都市里走出属于自己的一条不平凡的路来。"},
     {"totalCount":"333.7万","serial":true,"author":"就爱吃海椒","title":"都市护花神医","cover":"https://easyreadfs.nosdn.127.net/nfb.df0d12128185487e916adb97fa9c08c8.jpg","sourceUuid":"np_Jyw6fMUT3yGp-DIoK29-yUmKf_z4aSd9ayqeQ9ty_PJVJQ","category":"都市生活","description":"上班第一天就和23岁的霸道女总裁发生了关系，她发誓要让我跪下唱征服，不择手段要把我拴在身边。为了挽回一个男人的尊严，我拼了！"},
     {"totalCount":"792.8万","serial":true,"author":"山间老寺","title":"纵横官场之权色无边","cover":"https://easyreadfs.nosdn.127.net/nfb.ff7d680f330e4c5aa1b969c09c99a6a6.jpg","sourceUuid":"np_c3sEJM1G3yWp-2lwemwlyUTaf6H_MnQtbnnOF493rqg7JXoEKQ","category":"官场职场","description":"李睿在单位里被美女上司无情欺压，家里面老婆红杏出墙，陷入了人生最低谷。在一次防汛检查时，他跟上司袁晶晶闹翻，事后才知她是市里某领导的儿媳。山洪暴发，李睿凑巧救了某位贵人，自此成为了市里的大红人……"},
     {"totalCount":"390.6万","serial":false,"author":"钓人的鱼","title":"国色天香（全文）","cover":"https://easyreadfs.nosdn.127.net/novel_aa5aa1fc398846f29b786e24dd78931f.jpeg","sourceUuid":"np_JnppLZkV23Cv-T4mKzktnkjed6n-OyUobSXFF94mqalVJQ","category":"都市生活","description":"莫小鱼，一个老老实实的黑车司机，做梦都想不到因为一单黑车生意将自己的人生完全改变，一个套接着一个套，一个局接着一个局，美女设局也就罢了，老子忍了，妈的，你一个糟老头子也来设局害我……\n作者还有两本书《官梯》，《村长的妖孽人生》也非常的精彩，大家可以看一下，保证物有所值。都在网易云阅读。\n"}
   ]
    }
 }
 render()
 {
  return(
   <div className="homePage">
    <div className="container">
     <ul className="nav">
      <li> <Link to="/"><img src={search} /><h4>搜索</h4></Link></li>
      <li> <Link to="/"><img src={person} /><h4>个人中心</h4></Link></li>
      <li> <Link to="/"><img src={coin} /><h4>充值</h4></Link></li>
      <li> <Link to="/"><img src={book} /><h4>阅读历史</h4></Link></li>
     </ul>
     <div className="category">
       <div className="left"><Link to="/">分类</Link></div>
       <div className="right"><Link to="/">排行</Link></div>
     </div>
     <ul className="book-list">
     {
      this.state.tjArr.map((item,index)=>{
       return(
        <li key={index}>
         <Link to={item.url}>
          <div className="book-list-top">
           <img src={item.img} />
           <h3>{item.title}</h3>
           <p className="author">{item.author}</p>
          </div>
         </Link>
        </li>
        )
      })
     }
     </ul>
     <div className="changebtn">换一换<img src={changebtn}/></div>
    </div>
    <div className="cardTitle">
      <div className="title"><b className="sep"></b>排行</div>
      <Link to="more" className="more">更多<em className="arrow"></em></Link>
    </div>
    <ul className="ranking-tabs">
      <li>女生</li>
      <li className="active">男生</li>
      <li>出版</li>
    </ul>
    <div className="container">
       <ul className="book-list">
        {
         this.state.manArr.map((item,index)=>{
          return(
           <li key={index}>
            <b className="index">{index+1}</b>
            <Link to={item.url}>
             <div className="book-list-top">
              <img src={item.img} />
              <h3>{item.title}</h3>
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
         this.state.list.slice(3,9).map((item,index)=>{
          return(
           <li>
            <Link  to="">
              <span className="index">{index+4}.</span>
              <span className="tag">{item.category}</span>
              <span className="title">{item.title}</span>
              <span className="author f-fr">{item.author}</span>
            </Link>
           </li>
           )
         })
        }
       </ul>
       <a class="btn-more" href="/rank.do">更多</a>
     </div>
     <div class="copyright">
       <p>杭州酷炫书城信息技术有限公司版权所有©2017-2018</p>
       <p>浙ICP备17039369号</p>
     </div>
     <div class="lastReadTip">
      <Link to="/">
       <b class="icon icon-bookmarket"></b>
       <p class="desc">上次看到《兵王都市传奇》，点击继续</p>
       <b class="arrow"></b>
      </Link>
     </div>
   </div>
   )
 }
}