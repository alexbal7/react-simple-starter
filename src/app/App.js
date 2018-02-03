import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';

import Header from './core/components/header/Header';
import NotFound from './core/components/notFound/NotFound';
import Home from './modules/common/components/Home/Home';
import Info from './modules/common/components/Info/Info';

import './App.less';

const LazyContact = Loadable({
  loader: () => import('./modules/contacts/components/contact/Contact'),
  loading() {
    return <div>Loading...</div>
  }
});

const LazyAbout = Loadable({
  loader: () => import('./modules/about/components/about/About'),
  loading() {
    return <div>Loading...</div>
  }
});

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header title="Welcome to React Starter" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/info" component={Info} />
          <Route path="/contact" component={LazyContact} />
          <Route path="/about" component={LazyAbout} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
