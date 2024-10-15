'use client'
import React from 'react'
import {useSearchParams} from 'next/navigation' // Import useRouter
import SkinCard, {SkinCardProps} from '../components/SkinCard'

const SkinPage = async () => {
  const searchParams = useSearchParams() // Use useSearchParams
  const search = searchParams.get('search') // Get search term from query parameters

  const res = await fetch('https://valorant-api.com/v1/weapons/skins')
  const res_json = await res.json()
  const skins = res_json.data

  // Filter skins based on the search term
  const filteredSkins = search
    ? skins.filter((skin: SkinCardProps) => skin.displayName.toLowerCase().includes((search as string).toLowerCase()))
    : skins

  return (
    <main>
      <div className="flex flex-wrap gap-4 justify-center mt-10">
        {filteredSkins.length ? ( // Check if there are filtered skins
          filteredSkins.map(
            (skin: SkinCardProps) =>
              !skin.displayName.includes('Standard') &&
              !skin.displayName.includes('Random Favorite') && (
                <div className="hover:scale-105 hover:opacity-50" key={skin.uuid}>
                  <SkinCard
                    key={skin.uuid}
                    uuid={skin.uuid}
                    displayName={skin.displayName}
                    displayIcon={skin.displayIcon}
                  />
                </div>
              ),
          )
        ) : (
          <p>No search results found. Try searching for a different skin.</p>
        )}
      </div>
    </main>
  )
}

export default SkinPage
