import React from 'react';


function Alert(messages=[]) {


  return (
    <div>
      {messages.map(m => 
        <p>m</p>
      )}
    </div>
  )
}

export default Alert