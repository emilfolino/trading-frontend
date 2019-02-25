import Price from "../views/Price/Price";
import UserLogin from "../views/User/UserLogin";
import User from "../views/User/User";
import Trade from "../views/Trade/Trade";
import Message from "../views/Message/Message";


const dashboardRoutes = [
  {
    path: "/price",
    name: "BANAN STOCK PRICES",
    icon: "pe-7s-graph2",
    component: Price,
    parameters: null,
    visible: true
  },
  {
      path: "/user/login",
      name: "LOGIN",
      icon: null,
      component: UserLogin,
      parameters: null,
      visible: false
    },
  {
    path: "/user",
    name: "USER ACCOUNT",
    icon: "pe-7s-user",
    component: User,
    parameters: "loginReq",
    // parameters: null,
    visible: true
  },
  {
    path: "/trade",
    name: "TRADE",
    icon: "pe-7s-cash",
    component: Trade,
    parameters: "loginReq",
    // parameters: null,
    visible: true
  },
  {
  path: "/message",
  name: "MEDDELANDE",
  icon: null,
  component: Message,
  parameters: null,
  visible: false
  },
  { redirect: true, path: "/", to: "/price", name: "BANANA TRADING" }
];

export default dashboardRoutes;
