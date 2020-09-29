import { Card , CardContent, Typography } from '@material-ui/core'
import React from 'react'
import {prettyPrintStat} from '../util/stats'

function Info({title, cases, total, ...props}) {
    const handleChange = (e) => {
        console.log("clicked");
        props.onClick()
    }
    return (
        <Card className="infoBox" onClick={handleChange}>
            <CardContent>
                <Typography color="textSecondary">
                    {title}
                </Typography>
                 <h2 className={title === "Recovered" ? "infoBox__recovered infoBox__cases " : "infoBox__cases " }>{prettyPrintStat(cases)}</h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {prettyPrintStat(total)}Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Info
