import React,{Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
function getCookie(str){
    return false
}
class Routers extends Component{
    render(){
        let {routes} = this.props
        return (
            <Switch>
                {
                    routes.map((item,index)=>{
                        return <Route path={item.path} exact={item.exact||false} render={(routerApi)=>{
                            if(item.path=='/login' || getCookie('token')){
                                return <item.component routes={item.children} {...routerApi}></item.component>
                            }else{
                                return <Redirect to={{pathname:"/login",state:{from:item.path}}}></Redirect>
                            }
                            // return <item.component routes={item.children} {...routerApi}></item.component>
                        }} key={index}></Route>
                    })
                }
            </Switch>
        )
    }
}

export default Routers