import React from 'react'
import SkinCard, {SkinCardProps} from '../components/SkinCard'

const SkinPage = async () => {
  const res = await fetch('https://valorant-api.com/v1/weapons/skins')
  const res_json = await res.json()
  const skins = res_json.data

  return (
    <main>
      <>
        <div className="flex flex-wrap gap-20 justify-center">
          {skins.map(
            (skin: SkinCardProps) =>
              !skin.displayName.includes('Standard') &&
              !skin.displayName.includes('Random Favorite') && (
                <div
                  className="w-full sm:w-1/2 md:w-1/3 transition-transform transform hover:scale-105 hover:opacity-50"
                  key={skin.uuid}
                >
                  <SkinCard
                    key={skin.uuid}
                    uuid={skin.uuid}
                    displayName={skin.displayName}
                    displayIcon={skin.displayIcon}
                  />
                </div>
              ),
          )}
        </div>
      </>
    </main>
  )
}

export default SkinPage
