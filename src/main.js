// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';
import Navigation from 'vue-navigation'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css';
import { Button  } from 'mint-ui';
import { Header } from 'mint-ui'
import { Loadmore } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Navbar, TabItem } from 'mint-ui';

import {Form ,Field,CellGroup,Picker,Popup,Collapse, CollapseItem,DatetimePicker,RadioGroup,Dialog,Icon,List,Step, Steps,Rate,Uploader, Image as VanImage, Grid, GridItem ,NavBar ,Calendar,ActionSheet,Cell,Radio,Badge,Switch } from 'vant';
Vue.use(Badge);
Vue.use(Radio);
Vue.use(Cell);
Vue.use(ActionSheet);
Vue.use(Switch);
Vue.use(Calendar);
Vue.use(Field);
Vue.use(CellGroup);
Vue.use(Picker);
Vue.use(Popup );
Vue.use(Collapse );
Vue.use(CollapseItem );
Vue.use(DatetimePicker );
Vue.use(RadioGroup );
Vue.use(Form );
Vue.use(Dialog);
Vue.use(Icon);
Vue.use(List);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Rate);
Vue.use(Uploader);
Vue.use(Grid);
Vue.use(GridItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(NavBar.name, NavBar);
Vue.component(VanImage.name, VanImage);
Vue.component(Cell.name, Cell);
Vue.component(Toast.name, Toast);
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Popup.name, Popup);
Vue.use(Mint)
Vue.use(Navigation, {router})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
