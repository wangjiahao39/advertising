import React,{Component,Fragment} from 'react'
import Loading from '../components/loading'

class Config extends Component{
    constructor(){
        super()
        this.state={
            Comp:undefined
        }
    }
    render(){
        const {Comp} = this.state
        return <Fragment>
            <Loading spining={!this.state.Comp}></Loading>
            {Comp&&<Comp/>}
        </Fragment>
    }
    componentDidMount(){
        this.props.compFn().then((comp)=>{
            setTimeout(()=>{
               this.setState({
                    Comp:comp.default
                })
            },1000)
        })
    }
}
function HighComp(compFn){
    return class extends Component{
        render(){
            return <Config compFn={compFn}/>
        }
    }
}

export default HighComp