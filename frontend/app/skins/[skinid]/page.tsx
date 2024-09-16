import React from 'react'
import {notFound} from 'next/navigation'

function Skin({ params }: { params: { skinid: string } }) {
    if (parseInt(params.skinid) > 10){notFound()}
    if (isNaN(parseFloat(params.skinid))){notFound()}
  
    return (
    <div>Skin id page
        <p>{params.skinid}</p>
    </div>
  )
}

export default Skin