import { Card, CardContent,Typography } from '@mui/material'
import React from 'react'

function InfoBox({title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* Title */}
                <Typography className='infoBox__title' color="textSecondary">
                {title}
                </Typography>
                
                {/* Number of Cases */}
                <h2 className='infoBox__cases'>{cases}</h2>
                
                {/* Total */}
                <Typography className='infoBox__total'>{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox