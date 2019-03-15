import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {

  console.log('[Loading]')

  return (
    <div className='centerLoading'>
      <ReactLoading type={'bubbles'} color={'#343a40'} height={'10%'} width={'10%'} />
    </div>
  )

};

export default React.memo(Loading);