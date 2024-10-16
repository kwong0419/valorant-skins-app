'use client'
import React, {useState, useEffect} from 'react'
import {useSearchParams} from 'next/navigation'
import BundleCard, {BundleCardProps} from '../components/BundleCard'
import Loader from '../components/Loader'

const BundlePage = () => {
  const searchParams = useSearchParams()
  const [bundles, setBundles] = useState<BundleCardProps[]>([])
  const [filteredBundles, setFilteredBundles] = useState<BundleCardProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBundles = async () => {
      setIsLoading(true)
      const res = await fetch('https://valorant-api.com/v1/bundles')
      const res_json = await res.json()
      setBundles(res_json.data)
      setIsLoading(false)
    }
    fetchBundles()
  }, [])

  useEffect(() => {
    const search = searchParams.get('search')
    const filtered = search
      ? bundles.filter((bundle: BundleCardProps) => bundle.displayName.toLowerCase().includes(search.toLowerCase()))
      : bundles
    setFilteredBundles(filtered)
  }, [searchParams, bundles])

  return (
    <main>
      <div className="flex flex-wrap gap-6 justify-center mt-10">
        {isLoading ? (
          <Loader />
        ) : filteredBundles.length ? (
          filteredBundles.map((bundle: BundleCardProps) => (
            <BundleCard
              key={bundle.uuid}
              uuid={bundle.uuid}
              displayName={bundle.displayName}
              displayIcon={bundle.displayIcon}
              description={bundle.description}
            />
          ))
        ) : (
          <p>No search results found. Try searching for a different bundle.</p>
        )}
      </div>
    </main>
  )
}

export default BundlePage
