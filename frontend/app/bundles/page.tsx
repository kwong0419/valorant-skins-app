'use client'
import React, {useState, useEffect, Suspense} from 'react'
import {useSearchParams} from 'next/navigation'
import BundleCard, {BundleCardProps} from '../components/BundleCard'
import Loader from '../components/Loader'
import FeaturedBundle from '../components/FeaturedBundle'

function BundlePageContent() {
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
    <main className="container mx-auto px-4 py-8">
      <FeaturedBundle />
      <div className="flex flex-wrap gap-6 justify-center mt-16">
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

const BundlePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BundlePageContent />
    </Suspense>
  )
}

export default BundlePage
