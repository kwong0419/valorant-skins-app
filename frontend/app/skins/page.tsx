import React from 'react'
import SkinCard, {SkinCardProps} from '../components/SkinCard'

const SkinPage = async () => {
  const res = await fetch('https://valorant-api.com/v1/weapons/skins')
  const res_json = await res.json()
  const skins = res_json.data

  return (
    <main>
      <>
        <h1>Skins</h1>
        <div className="flex flex-wrap gap-20">
          {skins.map(
            (skin: SkinCardProps) =>
              !skin.displayName.includes('Standard') &&
              !skin.displayName.includes('Random Favorite') && (
                <SkinCard
                  key={skin.uuid}
                  uuid={skin.uuid}
                  displayName={skin.displayName}
                  displayIcon={skin.displayIcon}
                />
              ),
          )}
        </div>
      </>
    </main>
  )
}

export default SkinPage
