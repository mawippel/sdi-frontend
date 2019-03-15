import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import Loading from './Loading';

const LazyRoute = (props) => {

  console.log('[LazyRoute]')

  return (
    <Route exact={props.exact} path={props.path}
      render={(innerProps) =>
        <Suspense fallback={<Loading />}>
          {props.children(innerProps)}
        </Suspense>
      }
    />
  );

};

export default React.memo(LazyRoute);
