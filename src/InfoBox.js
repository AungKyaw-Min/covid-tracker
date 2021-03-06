import { Card, CardContent,Typography } from '@mui/material'
import React from 'react'
import './InfoBox.css'

function InfoBox({title, cases, isRed, active, total, ...props}) {
    return (
        <Card onClick = {props.onClick}
        className={`infoBox ${active && "infoBox--selected"} ${
            isRed && "infoBox--red"
          }`}>
            <CardContent>
                {/* Title */}
                <Typography className='infoBox__title' color="textSecondary">
                {title}
                </Typography>
                
                {/* Number of Cases */}
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
                
                {/* Total */}
                <Typography className='infoBox__total'>{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox