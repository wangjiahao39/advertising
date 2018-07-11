//import Home from '../pages/home'
//import Plan from '../pages/plan'
// import Unit from '../pages/unit'
// import Idea from '../pages/idea'
import Tools from '../pages/tools'
// import Account from '../pages/account'
// import Customer from '../pages/customer'
import Loadable from './loadable'

let router = {
    routes: [
        {
            path: '/',
            component: Loadable('home'),
            exact: true
        },
        {
            path: '/plan',
            component: Loadable('plan')
        },
        {
            path: '/unit',
            component: Loadable('unit')
        },
        {
            path: '/idea',
            component: Loadable('idea')
        },
        {
            path: '/tools',
            component: Tools
            // children:[
            //     {
            //         path:'/tools/account',
            //         component:Account
            //     },
            //     {
            //         path:'/tools/customer',
            //         component:Customer
            //     }
            // ]
        },
        {
            path: '/account',
            component: Loadable('account')
        },
        {
            path: '/customer',
            component: Loadable('customer')
        }
    ]
}
let { routes } = router
export { routes }
export default router