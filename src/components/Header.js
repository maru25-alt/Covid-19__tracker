import React from 'react';
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { MenuItem } from '@material-ui/core';

function Header({countries, country, onChange}) {
   

const onHandleChange = async (e) => {
  onChange(e)
   
}

const inputRef = React.createRef()
  return (
        <div className="header__app">
          <h1 className="header__title">COVID-19 TRACKER</h1>
          
          <FormControl className="header__dropdown" ref={inputRef}>
              <Select variant="outlined" value={country} onChange={onHandleChange}> 
              <MenuItem key="worldwide" value="worldwide">WorldWide</MenuItem>
              {countries && countries.map(country => {
                   return(
                    <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
                   )
              })
              }
                    
              </Select>
          </FormControl>
        </div>
    )
}

export default Header
