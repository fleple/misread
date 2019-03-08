import React from 'react';
import getIconBySymbol from '../../helpers/getIconBySymbol';

const TableHistory = (props) => (
  <table className='table-history'>
    <thead>
      <tr>
        <th>coin</th>
        <th>price</th>
        <th>amount</th>
        <th>date</th>
      </tr>
    </thead>
    <tbody>
      {
        props.data.map(item => (
          <tr key={item._id}>
            <td className='history-coin'>
              <div className='wrap-img'>
                <img src={getIconBySymbol(item.symbol)} alt='icon-coin'/>
              </div>
              {item.symbol} {item.id}
            </td>
            <td>${item.price.toFixed(4)}</td>
            <td>{item.amount}</td>
            <td>{item.date}</td>
          </tr>
        ))
      }
    </tbody>
  </table>  
);

export default TableHistory;