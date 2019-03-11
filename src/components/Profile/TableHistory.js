import React, { useState , memo } from 'react';
import getIconBySymbol from '../../helpers/getIconBySymbol';

const TableHistory = (props) => {
  const [currentPage, setPage ] = useState(0);

  let dataHistory = [];
  const divider = 5;
  let start = 0;
  let end = start + divider;
  const length = props.data.length;
  for(let i = 0; i < length / divider; i++) {
    dataHistory.push(props.data.slice(start, end));
    start += divider;
    end += divider;
  }

  const prevData = () => {
    const nextPage = currentPage - 1 >= 0 ? currentPage - 1 : 0; 
    setPage(nextPage);
  }
  
  const historyLength = dataHistory.length;
  const nextData = () => {
    const nextPage = currentPage + 1 <= historyLength - 1
      ? currentPage + 1
      : historyLength - 1; 
    setPage(nextPage);
  }

  return (
    <>
      <h1 className='table-title'>{props.header}</h1>
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
            dataHistory[currentPage].map(item => (
              <tr key={item._id}>
                <td className='history-coin'>
                  <div className='wrap-img'>
                    <img src={getIconBySymbol(item.symbol)} alt='icon-coin'/>
                  </div>
                  {item.symbol}
                </td>
                <td>${item.price.toFixed(4)}</td>
                <td>{item.amount}</td>
                <td>{new Date(+item.date).toLocaleString()}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      { historyLength > 1 &&
        <div className='btns-history'>
          <button
            disabled={currentPage === 0}
            onClick={prevData}>
              Prev
          </button>
          <button
            disabled={currentPage === historyLength - 1}
            onClick={nextData}>
              Next
          </button>
        </div>
      }
    </>
  );
  
}

export default memo(TableHistory);