var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,n=Object.prototype.propertyIsEnumerable,l=(t,a,n)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n,s=(e,s)=>{for(var c in s||(s={}))t.call(s,c)&&l(e,c,s[c]);if(a)for(var c of a(s))n.call(s,c)&&l(e,c,s[c]);return e};import{a as c,T as r,r as m,P as o,I as i,c as p,p as d,D as u,d as _,b as E,K as v,u as h,C as y,e as f,f as g,B as w,M as N,g as b,h as k,N as x,i as S,q as C,j,F as R,k as M,l as q,S as F,R as Y,m as z,n as I}from"./vendor.60e8d1e1.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const n=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,s)=>{const c=new URL(e,n);if(self[t].moduleMap[c])return a(self[t].moduleMap[c]);const r=new Blob([`import * as m from '${c}';`,`${t}.moduleMap['${c}']=m;`],{type:"text/javascript"}),m=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){s(new Error(`Failed to import: ${e}`)),l(m)},onload(){a(self[t].moduleMap[c]),l(m)}});document.head.appendChild(m)})),self[t].moduleMap={}}}("/assets/");c.defaults.baseURL="http://api-cost.chennick.wang",c.defaults.withCredentials=!0,c.defaults.headers["X-Requested-With"]="XMLHttpRequest",c.defaults.headers.Authorization=`${localStorage.getItem("token")||null}`,c.defaults.headers.post["Content-Type"]="application/json",c.interceptors.response.use((e=>"object"!=typeof e.data?(r.show("服务端异常！"),Promise.reject(e)):200!=e.data.code?(e.data.msg&&r.show(e.data.msg),401==e.data.code&&(window.location.href="/login"),Promise.reject(e.data)):e.data));const $="http://api.chennick.wang",W=c.get,D=c.post,B={1:{icon:"canyin"},2:{icon:"fushi"},3:{icon:"jiaotong"},4:{icon:"riyong"},5:{icon:"gouwu"},6:{icon:"xuexi"},7:{icon:"yiliao"},8:{icon:"lvxing"},9:{icon:"renqing"},10:{icon:"qita"},11:{icon:"gongzi"},12:{icon:"jiangjin"},13:{icon:"zhuanzhang"},14:{icon:"licai"},15:{icon:"tuikuang"},16:{icon:"qita"}},O=0,L=3,T=4,P=0,A=2,U=3,K=e=>e&&e.startsWith("http")?e:e=`${$}${e}`;var H="_popup-type_4v4ui_1",X="_header_4v4ui_7",Z="_cross_4v4ui_20",G="_content_4v4ui_28",J="_all_4v4ui_31",Q="_title_4v4ui_38",V="_expense-wrap_4v4ui_43",ee="_income-wrap_4v4ui_44",te="_active_4v4ui_58";const ae=m.forwardRef((({onSelect:e},t)=>{const[a,n]=m.useState(!1),[l,s]=m.useState("all"),[c,r]=m.useState([]),[d,u]=m.useState([]);m.useEffect((async()=>{const{data:{list:e}}=await W("/api/type/list");r(e.filter((e=>1==e.type))),u(e.filter((e=>2==e.type)))}),[]),t&&(t.current={show:()=>{n(!0)},close:()=>{n(!1)}});const _=t=>{s(t.id),n(!1),e(t)};return m.createElement(o,{visible:a,direction:"bottom",onMaskClick:()=>n(!1),destroy:!1,mountContainer:()=>document.body},m.createElement("div",{className:H},m.createElement("div",{className:X},"请选择类型",m.createElement(i,{type:"wrong",className:Z,onClick:()=>n(!1)})),m.createElement("div",{className:G},m.createElement("div",{onClick:()=>_({id:"all"}),className:p({[J]:!0,[te]:"all"==l})},"全部类型"),m.createElement("div",{className:Q},"支出"),m.createElement("div",{className:V},c.map(((e,t)=>m.createElement("p",{key:t,onClick:()=>_(e),className:p({[te]:l==e.id})},e.name)))),m.createElement("div",{className:Q},"收入"),m.createElement("div",{className:ee},d.map(((e,t)=>m.createElement("p",{key:t,onClick:()=>_(e),className:p({[te]:l==e.id})},e.name)))))))}));ae.propTypes={onSelect:d.func};var ne={};const le=m.forwardRef((({onSelect:e,mode:t="date"},a)=>{const[n,l]=m.useState(!1),[s,c]=m.useState(new Date);return a&&(a.current={show:()=>{l(!0)},close:()=>{l(!1)}}),m.createElement(o,{visible:n,direction:"bottom",onMaskClick:()=>l(!1),destroy:!1,mountContainer:()=>document.body},m.createElement("div",{className:ne.popupMonth},m.createElement(u,{visible:n,value:s,mode:t,onOk:a=>{c(a),l(!1),"month"==t?e(_(a).format("YYYY-MM")):"date"==t&&e(_(a).format("YYYY-MM-DD"))},onCancel:()=>l(!1)})))}));le.propTypes={mode:d.string,onSelect:d.func};var se=i.createFromIconfont("//at.alicdn.com/t/font_2236655_w1mpqp7n1ni.js");var ce={addWrap:"_add-wrap_11omu_1",header:"_header_11omu_7",close:"_close_11omu_10",filter:"_filter_11omu_15",type:"_type_11omu_21",expense:"_expense_11omu_30",active:"_active_11omu_33",income:"_income_11omu_38",time:"_time_11omu_43",arrow:"_arrow_11omu_52",money:"_money_11omu_56",sufix:"_sufix_11omu_61",amount:"_amount_11omu_66",typeWarp:"_type-warp_11omu_70",typeBody:"_type-body_11omu_79",typeItem:"_type-item_11omu_83",iconfontWrap:"_iconfont-wrap_11omu_90",iconfont:"_iconfont_11omu_90",remark:"_remark_11omu_116"};const re=m.forwardRef((({detail:e={},onReload:t},a)=>{const n=m.useRef(),l=e&&e.id,[s,c]=m.useState(!1),[d,u]=m.useState("expense"),[h,y]=m.useState([]),[f,g]=m.useState([]),[w,N]=m.useState({}),[b,k]=m.useState(""),[x,S]=m.useState(""),[C,j]=m.useState(!1),[R,M]=m.useState(new Date);m.useEffect((()=>{e.id&&(u(1==e.pay_type?"expense":"income"),N({id:e.type_id,name:e.type_name}),S(e.remark),k(e.amount),M(_(Number(e.date)).$d))}),[e]),a&&(a.current={show:()=>{c(!0)},close:()=>{c(!1)}}),m.useEffect((async()=>{const{data:{list:e}}=await W("/api/type/list"),t=e.filter((e=>1==e.type)),a=e.filter((e=>2==e.type));y(t),g(a),l||N(t[0])}),[]);const q=e=>{u(e),N("expense"==e?h[0]:f[0])},F=async()=>{if(!b)return void r.show("请输入具体金额");const e={amount:Number(b).toFixed(2),type_id:w.id,type_name:w.name,date:1e3*_(R).unix(),pay_type:"expense"==d?1:2,remark:x||""};l?(e.id=l,await D("/api/bill/update",e),r.show("修改成功")):(await D("/api/bill/add",e),k(""),u("expense"),N(h[0]),M(new Date),S(""),r.show("添加成功")),c(!1),t&&t()};return m.createElement(o,{visible:s,direction:"bottom",onMaskClick:()=>c(!1),destroy:!1,mountContainer:()=>document.body},m.createElement("div",{className:ce.addWrap},m.createElement("header",{className:ce.header},m.createElement("span",{className:ce.close,onClick:()=>c(!1)},m.createElement(i,{type:"wrong"}))),m.createElement("div",{className:ce.filter},m.createElement("div",{className:ce.type},m.createElement("span",{onClick:()=>q("expense"),className:p({[ce.expense]:!0,[ce.active]:"expense"==d})},"支出"),m.createElement("span",{onClick:()=>q("income"),className:p({[ce.income]:!0,[ce.active]:"income"==d})},"收入")),m.createElement("div",{className:ce.time,onClick:()=>{n.current&&n.current.show()}},_(R).format("MM-DD")," ",m.createElement(i,{className:ce.arrow,type:"arrow-bottom"}))),m.createElement("div",{className:ce.money},m.createElement("span",{className:ce.sufix},"¥"),m.createElement("span",{className:p(ce.amount,ce.animation)},b)),m.createElement("div",{className:ce.typeWarp},m.createElement("div",{className:ce.typeBody},("expense"==d?h:f).map((e=>m.createElement("div",{onClick:()=>(e=>{N(e)})(e),key:e.id,className:ce.typeItem},m.createElement("span",{className:p({[ce.iconfontWrap]:!0,[ce.expense]:"expense"==d,[ce.income]:"income"==d,[ce.active]:w.id==e.id})},m.createElement(se,{className:ce.iconfont,type:B[e.id].icon})),m.createElement("span",null,e.name)))))),m.createElement("div",{className:ce.remark},C?m.createElement(E,{autoHeight:!0,showLength:!0,maxLength:50,type:"text",rows:3,value:x,placeholder:"请输入备注信息",onChange:e=>S(e),onBlur:()=>j(!1)}):m.createElement("span",{onClick:()=>j(!0)},x||"添加备注")),m.createElement(v,{type:"price",onKeyClick:e=>(e=>{if("delete"!=(e=String(e)))"ok"!=e?"."==e&&b.includes(".")||"."!=e&&b.includes(".")&&b&&b.split(".")[1].length>=2||k(b+e):F();else{let e=b.slice(0,b.length-1);k(e)}})(e)}),m.createElement(le,{ref:n,onSelect:e=>{M(e)}})))}));re.propTypes={detail:d.object,onReload:d.func};var me={item:"_item_mkxeh_1",headerDate:"_header-date_mkxeh_7",date:"_date_mkxeh_18",money:"_money_mkxeh_22",itemIcon:"_item-icon_mkxeh_37"};const oe=({bill:e})=>{const[t,a]=m.useState(0),[n,l]=m.useState(0),s=h();m.useEffect((()=>{const t=e.bills.filter((e=>2==e.pay_type)).reduce(((e,t)=>e+=Number(t.amount)),0);a(t);const n=e.bills.filter((e=>1==e.pay_type)).reduce(((e,t)=>e+=Number(t.amount)),0);l(n)}),[e.bills]);return m.createElement("div",{className:me.item},m.createElement("div",{className:me.headerDate},m.createElement("div",{className:me.date},e.date),m.createElement("div",{className:me.money},m.createElement("span",null,m.createElement("img",{src:"//s.yezgea02.com/1615953405599/zhi%402x.png",alt:"支"}),m.createElement("span",null,"¥",n.toFixed(2))),m.createElement("span",null,m.createElement("img",{src:"//s.yezgea02.com/1615953405599/shou%402x.png",alt:"收"}),m.createElement("span",null,"¥",t.toFixed(2))))),e&&e.bills.map((e=>m.createElement(y,{className:me.bill,key:e.id,onClick:()=>(e=>{s.push(`/detail?id=${e.id}`)})(e),title:m.createElement(m.Fragment,null,m.createElement(se,{className:me.itemIcon,type:e.type_id?B[e.type_id].icon:1}),m.createElement("span",null,e.type_name)),description:m.createElement("span",{style:{color:2==e.pay_type?"red":"#39be77"}},`${1==e.pay_type?"-":"+"}${e.amount}`),help:m.createElement("div",null,_(Number(e.date)).format("HH:mm")," ",e.remark?`| ${e.remark}`:"")}))))};oe.propTypes={bill:d.object};var ie="_empty_1wb2f_1";const pe=({desc:e})=>m.createElement("div",{className:ie},m.createElement("img",{src:"//s.yezgea02.com/1619144597039/empty.png",alt:"暂无数据"}),m.createElement("div",null,e||"暂无数据"));pe.propTypes={desc:d.string};var de={home:"_home_1btdq_1",header:"_header_1btdq_7",dataWrap:"_data-wrap_1btdq_22",income:"_income_1btdq_33",typeWrap:"_type-wrap_1btdq_36",left:"_left_1btdq_48",arrow:"_arrow_1btdq_51",contentWrap:"_content-wrap_1btdq_55",add:"_add_1btdq_65"};var ue={data:"_data_f4sv2_1",total:"_total_f4sv2_5",time:"_time_f4sv2_13",date:"_date_f4sv2_35",title:"_title_f4sv2_39",expense:"_expense_f4sv2_45",income:"_income_f4sv2_51",structure:"_structure_f4sv2_55",head:"_head_f4sv2_60",tab:"_tab_f4sv2_70",active:"_active_f4sv2_80",content:"_content_f4sv2_88",item:"_item_f4sv2_88",left:"_left_f4sv2_93",type:"_type_f4sv2_100",name:"_name_f4sv2_115",right:"_right_f4sv2_124",percent:"_percent_f4sv2_129",momey:"_momey_f4sv2_135",proportion:"_proportion_f4sv2_138"};let _e=null;var Ee={user:"_user_2wwvo_1",head:"_head_2wwvo_5",info:"_info_2wwvo_14",content:"_content_2wwvo_33",logout:"_logout_2wwvo_43"};var ve="_auth_kpur3_1",he="_head_kpur3_5",ye="_tab_kpur3_16",fe="_avtive_kpur3_25",ge="_form_kpur3_30",we="_operation_kpur3_39",Ne="_agree_kpur3_42";var be="_header-warp_12wcp_1",ke="_block_12wcp_4",xe="_header_12wcp_1";const Se=({title:e=""})=>{const t=h();return m.createElement("div",{className:be},m.createElement("div",{className:ke},m.createElement(x,{className:xe,left:m.createElement(i,{type:"arrow-left",theme:"primary",onClick:()=>t.goBack()}),title:e})))};Se.propTypes={title:d.string};var Ce={detail:"_detail_1wagh_1",card:"_card_1wagh_8",type:"_type_1wagh_16",expense:"_expense_1wagh_29",income:"_income_1wagh_32",iconfont:"_iconfont_1wagh_35",amount:"_amount_1wagh_38",info:"_info_1wagh_43",time:"_time_1wagh_48",remark:"_remark_1wagh_61",operation:"_operation_1wagh_75",vanIcon:"_van-icon_1wagh_82"};var je="_account_u7md4_1",Re="_form_u7md4_4",Me="_btn_u7md4_9";var qe=j()((e=>{const{getFieldProps:t,getFieldError:a}=e.form;return m.createElement(m.Fragment,null,m.createElement(Se,{title:"重制密码"}),m.createElement("div",{className:je},m.createElement("div",{className:Re},m.createElement(y,{title:"原密码"},m.createElement(E,s({clearable:!0,type:"text",placeholder:"请输入原密码"},t("oldpass",{rules:[{required:!0}]})))),m.createElement(y,{title:"新密码"},m.createElement(E,s({clearable:!0,type:"text",placeholder:"请输入新密码"},t("newpass",{rules:[{required:!0}]})))),m.createElement(y,{title:"确认密码"},m.createElement(E,s({clearable:!0,type:"text",placeholder:"请再此输入新密码确认"},t("newpass2",{rules:[{required:!0}]}))))),m.createElement(w,{className:Me,block:!0,theme:"primary",onClick:()=>{e.form.validateFields((async(e,t)=>{if(!e){if(console.log(t),t.newpass!=t.newpass2)return void r.show("新密码输入不一致");await D("/api/user/modify_pass",{old_pass:t.oldpass,new_pass:t.newpass,new_pass2:t.newpass2}),r.show("修改成功")}}))}},"提交")))}));var Fe="_about_1urnl_1";var Ye={userinfo:"_userinfo_1wov8_1",item:"_item_1wov8_8",title:"_title_1wov8_12",avatar:"_avatar_1wov8_16",avatarUrl:"_avatar-url_1wov8_20",desc:"_desc_1wov8_26",upload:"_upload_1wov8_32",signature:"_signature_1wov8_35"};const ze=[{path:"/",component:()=>{const e=m.useRef(),t=m.useRef(),a=m.useRef(),[n,l]=m.useState(0),[s,c]=m.useState(0),[r,o]=m.useState({}),[p,d]=m.useState(_().format("YYYY-MM")),[u,E]=m.useState(1),[v,h]=m.useState([]),[y,g]=m.useState(0),[w,N]=m.useState(O),[b,k]=m.useState(P);m.useEffect((()=>{x()}),[u,r,p]);const x=async()=>{const{data:e}=await W(`/api/bill/list?date=${p}&type_id=${r.id||"all"}&page=${u}&page_size=5`);h(1==u?e.list:v.concat(e.list)),l(e.totalExpense.toFixed(2)),c(e.totalIncome.toFixed(2)),g(e.totalPage),k(U),N(T)},S=()=>{N(L),1!=u?E(1):x()};return m.createElement("div",{className:de.home},m.createElement("div",{className:de.header},m.createElement("div",{className:de.dataWrap},m.createElement("span",{className:de.expense},"总支出：",m.createElement("b",null,"¥ ",n)),m.createElement("span",{className:de.income},"总收入：",m.createElement("b",null,"¥ ",s))),m.createElement("div",{className:de.typeWrap},m.createElement("div",{className:de.left,onClick:()=>{e.current&&e.current.show()}},m.createElement("span",{className:de.title},r.name||"全部类型"," ",m.createElement(i,{className:de.arrow,type:"arrow-bottom"}))),m.createElement("div",{className:de.right},m.createElement("span",{className:de.time,onClick:()=>{t.current&&t.current.show()}},p,m.createElement(i,{className:de.arrow,type:"arrow-bottom"}))))),m.createElement("div",{className:de.contentWrap},v.length?m.createElement(f,{animationDuration:200,stayTime:400,refresh:{state:w,handler:S},load:{state:b,distance:200,handler:()=>{u<y&&(k(A),E(u+1))}}},v.map(((e,t)=>m.createElement(oe,{bill:e,key:t})))):m.createElement(pe,null)),m.createElement("div",{className:de.add,onClick:()=>{a.current&&a.current.show()}},m.createElement(se,{type:"tianjia"})),m.createElement(ae,{ref:e,onSelect:e=>{N(L),E(1),o(e)}}),m.createElement(le,{ref:t,mode:"month",onSelect:e=>{N(L),E(1),d(e)}}),m.createElement(re,{ref:a,onReload:S}))}},{path:"/data",component:()=>{const e=m.useRef(),[t,a]=m.useState("expense"),[n,l]=m.useState(_().format("YYYY-MM")),[s,c]=m.useState(0),[r,o]=m.useState(0),[d,u]=m.useState([]),[E,v]=m.useState([]),[h,y]=m.useState("expense");m.useEffect((()=>(f(),()=>{_e.dispose()})),[n]);const f=async()=>{const{data:e}=await W(`/api/bill/data?date=${n}`);c(e.total_expense),o(e.total_income);const t=e.total_data.filter((e=>1==e.pay_type)).sort(((e,t)=>t.number-e.number)),a=e.total_data.filter((e=>2==e.pay_type)).sort(((e,t)=>t.number-e.number));u(t),v(a),b("expense"==h?t:a)},w=e=>{a(e)},N=e=>{y(e),b("expense"==e?d:E)},b=e=>{window.echarts&&(_e=echarts.init(document.getElementById("proportion")),_e.setOption({tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{data:e.map((e=>e.type_name))},series:[{name:"支出",type:"pie",radius:"55%",data:e.map((e=>({value:e.number,name:e.type_name}))),emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]}))};return m.createElement("div",{className:ue.data},m.createElement("div",{className:ue.total},m.createElement("div",{className:ue.time,onClick:()=>{e.current&&e.current.show()}},m.createElement("span",null,n),m.createElement(i,{className:ue.date,type:"date"})),m.createElement("div",{className:ue.title},"共支出"),m.createElement("div",{className:ue.expense},"¥",s),m.createElement("div",{className:ue.income},"共收入¥",r)),m.createElement("div",{className:ue.structure},m.createElement("div",{className:ue.head},m.createElement("span",{className:ue.title},"收支构成"),m.createElement("div",{className:ue.tab},m.createElement("span",{onClick:()=>w("expense"),className:p({[ue.expense]:!0,[ue.active]:"expense"==t})},"支出"),m.createElement("span",{onClick:()=>w("income"),className:p({[ue.income]:!0,[ue.active]:"income"==t})},"收入"))),m.createElement("div",{className:ue.content},("expense"==t?d:E).map((e=>m.createElement("div",{key:e.type_id,className:ue.item},m.createElement("div",{className:ue.left},m.createElement("div",{className:ue.type},m.createElement("span",{className:p({[ue.expense]:"expense"==t,[ue.income]:"income"==t})},m.createElement(se,{type:e.type_id?B[e.type_id].icon:1})),m.createElement("span",{className:ue.name},e.type_name)),m.createElement("div",{className:ue.progress},"¥",Number(e.number).toFixed(2)||0)),m.createElement("div",{className:ue.right},m.createElement("div",{className:ue.percent},m.createElement(g,{shape:"line",percent:Number(e.number/Number("expense"==t?s:r)*100).toFixed(2),theme:"primary"}))))))),m.createElement("div",{className:ue.proportion},m.createElement("div",{className:ue.head},m.createElement("span",{className:ue.title},"收支构成"),m.createElement("div",{className:ue.tab},m.createElement("span",{onClick:()=>N("expense"),className:p({[ue.expense]:!0,[ue.active]:"expense"==h})},"支出"),m.createElement("span",{onClick:()=>N("income"),className:p({[ue.income]:!0,[ue.active]:"income"==h})},"收入"))),m.createElement("div",{id:"proportion"}))),m.createElement(le,{ref:e,mode:"month",onSelect:e=>{l(e)}}))}},{path:"/user",component:()=>{const e=h(),[t,a]=m.useState({}),[n,l]=m.useState(""),[s,c]=m.useState(!1),[o,i]=m.useState("");localStorage.getItem("token"),m.useEffect((()=>{p()}),[]);const p=async()=>{const{data:e}=await W("/api/user/get_userinfo");a(e),i(K(e.avatar)),l(e.signature)};return m.createElement("div",{className:Ee.user},m.createElement("div",{className:Ee.head},m.createElement("div",{className:Ee.info},m.createElement("span",null,"昵称：",t.username),m.createElement("span",null,m.createElement("img",{style:{width:30,height:30,verticalAlign:"-10px"},src:"//s.yezgea02.com/1615973630132/geqian.png",alt:""}),m.createElement("b",null,t.signature||"暂无内容"))),m.createElement("img",{className:Ee.avatar,style:{width:60,height:60,borderRadius:8},src:o,alt:""})),m.createElement("div",{className:Ee.content},m.createElement(y,{hasArrow:!0,title:"用户信息修改",onClick:()=>e.push("/userinfo"),icon:m.createElement("img",{style:{width:20,verticalAlign:"-7px"},src:"//s.yezgea02.com/1615974766264/gxqm.png",alt:""})}),m.createElement(y,{hasArrow:!0,title:"重制密码",onClick:()=>e.push("/account"),icon:m.createElement("img",{style:{width:20,verticalAlign:"-7px"},src:"//s.yezgea02.com/1615974766264/zhaq.png",alt:""})}),m.createElement(y,{hasArrow:!0,title:"关于我们",onClick:()=>e.push("/about"),icon:m.createElement("img",{style:{width:20,verticalAlign:"-7px"},src:"//s.yezgea02.com/1615975178434/lianxi.png",alt:""})})),m.createElement(w,{className:Ee.logout,block:!0,theme:"danger",onClick:async()=>{localStorage.removeItem("token"),e.push("/login")}},"退出登录"),m.createElement(N,{visible:s,title:"标题",closable:!0,onCancel:()=>c(!1),footer:m.createElement(w,{block:!0,theme:"primary",onClick:async()=>{const{data:e}=await D("/api/user/edit_signature",{signature:n});a(e),c(!1),r.show("修改成功")}},"确认")},m.createElement(E,{autoHeight:!0,showLength:!0,maxLength:50,type:"text",rows:3,value:n,placeholder:"请输入备注信息",onChange:e=>l(e)})))}},{path:"/login",component:()=>{const e=m.useRef(),[t,a]=m.useState("login"),[n,l]=m.useState(""),[s,c]=m.useState(""),[o,i]=m.useState(""),[d,u]=m.useState(""),_=m.useCallback((e=>{l(e)}),[]);return m.useEffect((()=>{document.title="login"==t?"登录":"注册"}),[t]),m.createElement("div",{className:ve},m.createElement("div",{className:he}),m.createElement("div",{className:ye},m.createElement("span",{className:p({[fe]:"login"==t}),onClick:()=>a("login")},"登录"),m.createElement("span",{className:p({[fe]:"register"==t}),onClick:()=>a("register")},"注册")),m.createElement("div",{className:ge},m.createElement(y,{icon:m.createElement(se,{type:"zhanghao"})},m.createElement(E,{clearable:!0,type:"text",placeholder:"请输入账号",onChange:e=>c(e)})),m.createElement(y,{icon:m.createElement(se,{type:"mima"})},m.createElement(E,{clearable:!0,type:"password",placeholder:"请输入密码",onChange:e=>i(e)})),"register"==t?m.createElement(y,{icon:m.createElement(se,{type:"mima"})},m.createElement(E,{clearable:!0,type:"text",placeholder:"请输入验证码",onChange:e=>u(e)}),m.createElement(b,{ref:e,charNum:4,onChange:_})):null),m.createElement("div",{className:we},"register"==t?m.createElement("div",{className:Ne},m.createElement(k,null),m.createElement("label",{className:"text-light"},"阅读并同意",m.createElement("a",null,"《掘掘手札条款》"))):null,m.createElement(w,{onClick:async()=>{if(s)if(o)try{if("login"==t){const{data:e}=await D("/api/user/login",{username:s,password:o});localStorage.setItem("token",e.token),window.location.href="/"}else{if(!d)return void r.show("请输入验证码");if(d!=n)return void r.show("验证码错误");const{data:e}=await D("/api/user/register",{username:s,password:o});r.show("注册成功"),a("login")}}catch(e){r.show("系统错误")}else r.show("请输入密码");else r.show("请输入账号")},block:!0,theme:"primary"},"login"==t?"登录":"注册")))}},{path:"/detail",component:()=>{const e=m.useRef(),t=S(),a=h(),{id:n}=C.parse(t.search),[l,s]=m.useState({});m.useEffect((()=>{c()}),[]);const c=async()=>{const{data:e}=await W(`/api/bill/detail?id=${n}`);s(e)};return m.createElement("div",{className:Ce.detail},m.createElement(Se,{title:"账单详情"}),m.createElement("div",{className:Ce.card},m.createElement("div",{className:Ce.type},m.createElement("span",{className:p({[Ce.expense]:1==l.pay_type,[Ce.income]:2==l.pay_type})},m.createElement(se,{className:Ce.iconfont,type:l.type_id?B[l.type_id].icon:1})),m.createElement("span",null,l.type_name||"")),1==l.pay_type?m.createElement("div",{className:p(Ce.amount,Ce.expense)},"-",l.amount):m.createElement("div",{className:p(Ce.amount,Ce.incom)},"+",l.amount),m.createElement("div",{className:Ce.info},m.createElement("div",{className:Ce.time},m.createElement("span",null,"记录时间"),m.createElement("span",null,_(Number(l.date)).format("YYYY-MM-DD HH:mm"))),m.createElement("div",{className:Ce.remark},m.createElement("span",null,"备注"),m.createElement("span",null,l.remark||"-"))),m.createElement("div",{className:Ce.operation},m.createElement("span",{onClick:()=>{N.confirm({title:"删除",content:"确认删除账单？",onOk:async()=>{await D("/api/bill/delete",{id:n}),r.show("删除成功"),a.goBack()}})}},m.createElement(se,{type:"shanchu"}),"删除"),m.createElement("span",{onClick:()=>{e.current&&e.current.show()}},m.createElement(se,{type:"tianjia"}),"编辑"))),m.createElement(re,{ref:e,detail:l,onReload:c}))}},{path:"/account",component:qe},{path:"/about",component:()=>m.createElement(m.Fragment,null,m.createElement(Se,{title:"关于我们"}),m.createElement("div",{className:Fe},m.createElement("h2",null,"关于项目"),m.createElement("article",null,"这个项目的初衷，是想让从事前端开发的同学，进入全栈开发的领域。当然，不能说学完本教程你就能胜任任何全栈开发。但至少，你已经可以从设计数据库表开始，把自己的一个想法转化成实际可见的项目。"),m.createElement("h2",null,"关于作者"),m.createElement("article",null,"从 2015 年实习开始至今，有 6 年前端开发经验。虽然没有在大厂呆过，但是正因如此，我深知奋战在中小厂的前端开发在从业 1 到 3 年后，会遇到什么瓶颈，小册中也详细的描述了怎样从初级到中级的进阶之路。"),m.createElement("h2",null,"关于小册"),m.createElement("article",null,"这是一本全栈小册，服务端采用 Node 上层架构 Egg.js，前端采用 React 框架 + Zarm 移动端组件库。本小册致力于让同学们学会服务端的开发流程，从设计数据库到接口的编写，前端的接口数据对接和页面制作，再到线上环境的部署。由于本人用的是 Mac，为了照顾到 Windows 系统的同学，全程关键步骤都会有 Windows 部分的讲解。")))},{path:"/userinfo",component:()=>{const e=h(),[t,a]=m.useState({}),[n,l]=m.useState(""),[s,o]=m.useState(""),i=localStorage.getItem("token");m.useEffect((()=>{p()}),[]);const p=async()=>{const{data:e}=await W("/api/user/get_userinfo");a(e),l(K(e.avatar)),o(e.signature)};return m.createElement(m.Fragment,null,m.createElement(Se,{title:"用户信息"}),m.createElement("div",{className:Ye.userinfo},m.createElement("h1",null,"个人资料"),m.createElement("div",{className:Ye.item},m.createElement("div",{className:Ye.title},"头像"),m.createElement("div",{className:Ye.avatar},m.createElement("img",{className:Ye.avatarUrl,src:n,alt:""}),m.createElement("div",{className:Ye.desc},m.createElement("span",null,"支持 jpg、png、jpeg 格式大小 200KB 以内的图片"),m.createElement(R,{className:Ye.filePicker,onChange:e=>{if(console.log("file.file",e.file),e&&e.file.size>204800)return void r.show("上传头像不得超过 200 KB！！");let t=new FormData;t.append("file",e.file),c({method:"post",url:`${$}/api/upload`,data:t,headers:{"Content-Type":"multipart/form-data",Authorization:i}}).then((e=>{l(K(e.data))}))},accept:"image/*"},m.createElement(w,{className:Ye.upload,theme:"primary",size:"xs"},"点击上传"))))),m.createElement("div",{className:Ye.item},m.createElement("div",{className:Ye.title},"个性签名"),m.createElement("div",{className:Ye.signature},m.createElement(E,{clearable:!0,type:"text",value:s,placeholder:"请输入个性签名",onChange:e=>o(e)}))),m.createElement(w,{onClick:async()=>{await D("/api/user/edit_userinfo",{signature:s,avatar:n}),r.show("修改成功"),e.goBack()},style:{marginTop:50},block:!0,theme:"primary"},"保存")))}}];var Ie="_tab_1udd2_1";const $e=({showNav:e})=>{const[t,a]=m.useState("/"),n=h();return m.createElement(M,{visible:e,className:Ie,activeKey:t,onChange:e=>{a(e),n.push(e)}},m.createElement(M.Item,{itemKey:"/",title:"账单",icon:m.createElement(se,{type:"zhangdan"})}),m.createElement(M.Item,{itemKey:"/data",title:"统计",icon:m.createElement(se,{type:"tongji"})}),m.createElement(M.Item,{itemKey:"/user",title:"我的",icon:m.createElement(se,{type:"wode"})}))};$e.propTypes={showNav:d.bool};const We=()=>{const e=S(),{pathname:t}=e,a=["/","/data","/user"],[n,l]=m.useState(!1);return m.useEffect((()=>{l(a.includes(t))}),[t]),m.createElement(q,{primaryColor:"#007fff"},m.createElement(m.Fragment,null,m.createElement(F,null,ze.map((e=>m.createElement(Y,{exact:!0,key:e.path,path:e.path},m.createElement(e.component,null))))),m.createElement($e,{showNav:n})))};z.render(m.createElement(m.StrictMode,null,m.createElement(I,null,m.createElement(We,null))),document.getElementById("root"));
