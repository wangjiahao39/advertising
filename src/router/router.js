import React,{Component} from 'react';
import { Route, Switch } from 'react-router-dom';

class Routers extends Component{
    render(){
        let {routes} = this.props
        return (
            <Switch>
                {
                    routes.map((item,index)=>{
                        return <Route path={item.path} exact={item.exact||false} render={(routerApi)=>{
                            return <item.component routes={item.children} {...routerApi}></item.component>
                        }} key={index}></Route>
                    })
                }
            </Switch>
        )
    }
}

export default Routers