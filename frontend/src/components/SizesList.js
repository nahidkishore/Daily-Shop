import React from 'react';

const SizesList = ({ list,deleteSize }) => {
  return list.length > 0 && (
      <>
        <h3 className="right-heading">Size List</h3>
        <div className='flex flex-wrap mt-3'>
        {list.map(size => (
            <div key={size.name} className="size" onClick={() => deleteSize(size.name)}>{size.name}</div>
        ))}
        </div>
      </>
    )
  
};

export default SizesList;
