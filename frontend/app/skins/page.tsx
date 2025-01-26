'use client'
import React, {useState, useEffect, Suspense} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import SkinCard, {SkinCardProps} from '../components/SkinCard'
import Loader from '../components/Loader'
import WeaponFilters from '../components/WeaponFilters'

function SkinPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [skins, setSkins] = useState<SkinCardProps[]>([])
  const [filteredSkins, setFilteredSkins] = useState<SkinCardProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSkins = async () => {
      setIsLoading(true)
      const res = await fetch('https://valorant-api.com/v1/weapons/skins')
      const res_json = await res.json()
      setSkins(res_json.data)
      setIsLoading(false)
    }
    fetchSkins()
  }, [])

  useEffect(() => {
    const search = searchParams.get('search')
    const filtered = search
      ? skins.filter((skin: SkinCardProps) => skin.displayName.toLowerCase().includes(search.toLowerCase()))
      : skins
    setFilteredSkins(filtered)
  }, [searchParams, skins])

  return (
    <main>
      {isLoading ? (
        <div className="w-full min-h-screen fixed top-0 left-0 z-50 bg-black">
          <Loader />
        </div>
      ) : (
        <>
          <WeaponFilters />
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            {filteredSkins.length ? (
              filteredSkins.map(
                (skin: SkinCardProps) =>
                  skin?.uuid &&
                  !skin.displayName.includes('Standard') &&
                  !skin.displayName.includes('Random Favorite') && (
                    <div className="hover:scale-105 hover:opacity-50" key={skin.uuid}>
                      <SkinCard
                        uuid={skin.uuid}
                        displayName={skin.displayName || 'Unknown'}
                        displayIcon={skin.displayIcon || ''}
                      />
                    </div>
                  ),
              )
            ) : (
              <p>No search results found. Try searching for a different skin.</p>
            )}
          </div>
        </>
      )}
    </main>
  )
}

const SkinPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SkinPageContent />
    </Suspense>
  )
}

export default SkinPage
