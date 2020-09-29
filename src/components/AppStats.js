import React from 'react'
import Info from './Info'

function AppStats() {
    return (
        <div className="app__stats">
            <Info title="Coronavirus Cases" cases={2000} total={2000}/>
            <Info title="Recovered"  cases={2000} total={3000}/>
            <Info title="Deaths"  cases={2000} total={4000}/>
        </div>
    )
}

export default AppStats
