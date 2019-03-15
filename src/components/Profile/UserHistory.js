import React, { memo } from 'react';
import TableHistory from './TableHistory';


const UserHistory = (props) => {
  const { buyHistory, sellHistory } = props;
  return (
    <div className='user-history'>
      {
        buyHistory.length && <div className='user-history-buy'>
         <TableHistory
          data={buyHistory}
          header='Buy Coins History'
        /> 
        </div>
      }
      {
        sellHistory.length > 0? <div className='user-history-sell'>
          <TableHistory
            data={sellHistory}
            header='Sell Coins History'
          />
        </div> : null
      }
    </div>
  )
}

export default memo(UserHistory);