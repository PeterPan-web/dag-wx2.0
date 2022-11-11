import Vue from 'vue'
import Router from 'vue-router'
import Site from '@/components/site'
import Interaction from '@/components/interaction'
import Search from '@/views/search.vue'
import Search_hft from '@/views/search_hft.vue'
import Show from '@/views/show.vue'
import Consult from '@/views/consult.vue'
import Open from '@/views/open.vue'
import Center from '@/views/center.vue'
import Guide from '@/views/guide.vue'
import Survey from '@/views/survey.vue'
import Link from '@/views/link.vue'
import Backfeed from '@/views/backfeed.vue'
import myBackFeed from '@/views/backfeed1.vue'
import NearSearch from '@/views/nearSearch.vue'
import HistorySearch from '@/views/historySearch.vue'
import historyDetail from '@/views/historyDetail.vue'
import realNameReg from '@/views/realNameReg.vue'
import NearSearchDetail from '@/views/nearSearchDetail.vue'
import Write from '@/views/write.vue'
import ArchDetail from '@/views/archDetail.vue'
import ArchDetailSq from '@/views/archDetail_sq.vue'
import ArchDetail_hft from '@/views/archDetail_hft.vue'
import ShowDetail from '@/views/showDetail.vue'
import ConsultDetail from '@/views/consultDetail.vue'
import OpenDetail from '@/views/openDetail.vue'
import HelpDetail from '@/views/helpDetail.vue'
import HaveDetail from '@/views/haveDetail.vue'
import FeedDetail from '@/views/feedDetail.vue'
import FileDetail from '@/views/fileDetail.vue'
import accusationReason from '@/views/accusationReason.vue'
import People from '@/views/people/people.vue'
import PeopleSite from '@/views/people/PeopleSite.vue'
import getLogin from '@/views/people/getLogin.vue'
import getLoginSite from '@/views/people/getLoginSite.vue'
import Help from '@/views/help/help.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/site',
      name: 'site',
      meta:{
      	index:0
      },
      component: Site
    },{
      path: '/interaction',
      name: 'interaction',
       meta:{
      	index:0
      },
      component: Interaction
    },
    {
      path: '/search',
      name:"search",
       meta:{
      	index:1
      },
      component: Search
    },
    {
          path: '/search_hft',
          name:"search_hft",
           meta:{
          	index:1
          },
          component: Search_hft
        },
    {
      path: '/historySearch',
      name:"historySearch",
       meta:{
      	index:2
      },
      component: HistorySearch
    },{
      path: '/realNameReg',
      name:"realNameReg",
       meta:{
      	index:2
      },
      component: realNameReg
    },{
      path: '/historyDetail',
      name:"historyDetail",
       meta:{
      	index:2
      },
      component: historyDetail
    },
    {
      path: '/archDetail',
      name:"archDetail",
       meta:{
      	index:2
      },
      component: ArchDetail
    },
    {
      path: '/archDetail_sq',
      name:"archDetail_sq",
       meta:{
      	index:1
      },
      component: ArchDetailSq
    },
    {
          path: '/archDetail_hft',
          name:"archDetail_hft",
           meta:{
          	index:2
          },
          component: ArchDetail_hft
        },
    {
      path: '/fileDetail',
      name:"fileDetail",
       meta:{
      	index:3
      },
      component: FileDetail
    },
    {
      path: '/show',
      name:"show",
       meta:{
      	index:1
      },
      component: Show
    },
   	{
      path: '/showDetail',
      name:"showDetail",
       meta:{
      	index:2
      },
      component: ShowDetail
    },
   	{
      path: '/consult',
      name:"consult",
       meta:{
      	index:1
      },
      component: Consult
    },
   	{
      path: '/consultDetail',
      name:"consultDetail",
       meta:{
      	index:2
      },
      component: ConsultDetail
    },
    {
     path: '/accusationReason',
     name:"accusationReason",
      meta:{
       index:2
     },
     component: accusationReason
   },
     {
      path: '/nearSearch',
      name:"nearSearch",
       meta:{
      	index:1
      },
      component: NearSearch
    },
    {
      path: '/nearSearchDetail',
      name:"nearSearchDetail",
       meta:{
      	index:2
      },
      component: NearSearchDetail
    },
    {
      path: '/open',
      name:"open",
       meta:{
      	index:1
      },
      component: Open
    },
    {
      path: '/openDetail',
      name:"openDetail",
       meta:{
      	index:2
      },
      component: OpenDetail
    },
    {
      path: '/center',
      name:"center",
       meta:{
      	index:1
      },
      component: Center
    },
    {
      path: '/survey',
      name:"survey",
       meta:{
      	index:1
      },
      component: Survey
    },
    {
      path: '/helpDetail',
      name:"helpDetail",
       meta:{
      	index:2
      },
      component: HelpDetail
    },
    {
      path: '/haveDetail',
      name:"haveDetail",
       meta:{
      	index:2
      },
      component: HaveDetail
    },
    {
      path: '/guide',
      name:"guide",
       meta:{
      	index:1
      },
      component: Guide
    },
    {
      path: '/link',
      name:"link",
       meta:{
      	index:1
      },
      component: Link
    },
    {
      path: '/backfeed',
      name:"backfeed",
       meta:{
      	index:1
      },
      component: Backfeed
    },{
      path: '/myBackFeed',
      name:"myBackFeed",
       meta:{
      	index:2
      },
      component: myBackFeed
    },
    {
      path: '/feedDetail',
      name:"feedDetail",
       meta:{
      	index:2
      },
      component: FeedDetail
    },
    {
      path: '/write',
      name:"write",
       meta:{
      	index:2
      },
      component: Write
    },
    {
      path:'/people',
      name:"people",
       meta:{
         index:1
       },
       component:People
    },
    {
      path:'/peopleSite',
      name:"peopleSite",
       meta:{
         index:1
       },
       component:PeopleSite
    },
    {
      path:'/help',
      name:"help",
       meta:{
         index:1
       },
       component:Help
    },
    {
      path:'/getLogin',
      name:"getLogin",
       meta:{
         index:2
       },
       component:getLogin
    },
    {
      path:'/getLoginSite',
      name:"getLoginSite",
       meta:{
         index:2
       },
       component:getLoginSite
    },
    {
      path: '/',
      name: 'site',
      //name: 'interaction',
      meta:{
      	index:0
      },
       component: Site
      //component:Interaction
    }
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
