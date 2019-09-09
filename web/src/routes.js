
//首页
const Main = () => import('./components/Main.vue');
const Home = () => import('./components/home/Home.vue');

//登录
const Login = () => import('./components/login/Login.vue');
const PhoneCodeLogin = () => import('./components/login/PhoneCodeLogin.vue');
const AccountLogin = () => import('./components/login/AccountLogin.vue');


//shop
const ShopList = () => import('./components/shop/ShopList.vue');


export const routes = [
  {path: "/login", component: Login, meta: {title: "登录"}},
  {path: "/phoneCodeLogin", component: PhoneCodeLogin, meta: {title: "手机号登录"}},
  {path: "/accountLogin", component: AccountLogin, meta: {title: "用户名登录"}},




  //sjop
  { path: "/shopList", component: ShopList, meta: { title: "健康服务列表", keepAlive: false } },



  {path: "/home", component: Main, meta: {title: "", keepAlive: false}},
  // {path: "/home", component: Home, meta: {title: "", keepAlive: true}},
  {path: "", component: Login, meta: {title: "登录", keepAlive: false}},
  // {path: '*', redirect:"/"}
];

