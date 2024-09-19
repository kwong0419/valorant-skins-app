import React from 'react'
import {notFound} from 'next/navigation'

async function SkinItem({params}: {params: {skinId: string}}) {
  // if (parseInt(params.skinId) > 10){notFound()}
  // if (isNaN(parseFloat(params.skinId))){notFound()}

  const res = await fetch(`https://valorant-api.com/v1/weapons/skins/${params.skinId}`)
  const res_json = await res.json()
  const skinItemData = res_json.data

  console.log(skinItemData)

  return (
    <div>
      <p>Skin Id Page</p>
      <div>{skinItemData.displayName}</div>
    </div>
  )
}

export default SkinItem
