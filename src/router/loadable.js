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
        window.chunkpath = this.props.path
        import(/* webpackFilename:`${chunkpath}` */`@/${this.props.path}`).then((comp)=>{
            setTimeout(()=>{
               this.setState({
                    Comp:comp.default
                })
            },1000)
        })
    }
}
function HighComp(path){
    return class extends Component{
        render(){
            return <Config path={path}/>
        }
    }
}

export default HighComp