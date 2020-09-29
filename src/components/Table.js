import React from 'react'
import '../css/table.css';

function Table({data}) {
  
    return (
        <div  className="table">
      
           {data.map(({country, cases})=> 
              (
                   <tr key={country}>
                       <td>{country}</td>
                       <td><strong>cases</strong> {cases}</td>
                   </tr>
               )
           )}
         

     </div>
    )
}

export default Table
