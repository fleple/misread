import React, { memo } from 'react';
import TableHistory from './TableHistory';


const UserHistory = (props) => {
  const { buyHistory, sellHistory } = props;
  return (
    <div className='user-history'>
      {
        buyHistory.length && <div className='user-history-buy'>
         <TableHistory data={buyHistory}/> 
        </div>
      }
      {
        sellHistory.length && <div className='user-history-sell'>
          <TableHistory data={sellHistory}/>
        </div>
      }
    </div>
  )
}

export default memo(UserHistory);