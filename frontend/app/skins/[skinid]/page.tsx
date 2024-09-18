import React from 'react'
import {notFound} from 'next/navigation'

const SkinItem = async ({params}: {params: {skinId: string}}) => {
  // if (parseInt(params.skinid) > 10){notFound()}
  // if (isNaN(parseFloat(params.skinid))){notFound()}

  async function fetchSkinItemData(id: string) {
    const res = await fetch(`https://valorant-api.com/v1/weapons/skins/${id}`)
    const res_json = await res.json()
    return res_json
  }

  const itemData = fetchSkinItemData(params.skinId)
  console.log('item data: ', itemData)

  return (
    <div>
      <p>Skin id page {params.skinId}</p>
      <div></div>
    </div>
  )
}

export default SkinItem
