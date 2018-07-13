import React, { Component, PureComponent ,Fragment} from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import {routes} from './router/config';
import Routers from './router/router';

class App extends Component {
    render() {
        return <BrowserRouter>
            <Routers routes={routes} />
        </BrowserRouter>
    }
}

export default App