import React from 'react'
import { Switch, Redirect } from 'react-router-dom';
import Header from './components/Header'
import LazyRoute from './components/auxiliary/LazyRoute';
const Configuration = React.lazy(() => import('./components/Configuration'));
const Monitoramento = React.lazy(() => import('./components/Monitoramento'));
const MonitDetails = React.lazy(() => import('./components/MonitDetails'));

const App = () => {

  return (
    <>
      <Header />
      <Switch>
        <LazyRoute exact={true} path='/configuracao'>
          {(innerProps) => <Configuration {...innerProps} />}
        </LazyRoute>
        <LazyRoute exact={true} path='/monitoramento'>
          {(innerProps) => <Monitoramento {...innerProps} />}
        </LazyRoute>
        <LazyRoute path='/monitoramento/:idMonit'>
          {(innerProps) => <MonitDetails {...innerProps} />}
        </LazyRoute>
        <Redirect to='/configuracao' />
      </Switch>
    </>
  );

}

export default App;
