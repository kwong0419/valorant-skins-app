import React from 'react'
import SkinCard, {SkinCardProps} from '../components/SkinCard'

const SkinPage = async () => {
  const res = await fetch('https://valorant-api.com/v1/weapons/skins')
  const res_json = await res.json()
  const skins = res_json.data

  console.log(skins)

  return (
    <main>
      <>
        <h1>Skins</h1>
        {skins.map((skin: SkinCardProps) => (
          <SkinCard key={skin.uuid} uuid={skin.uuid} displayName={skin.displayName} displayIcon={skin.displayIcon} />
        ))}
      </>
    </main>
  )
}

export default SkinPage
