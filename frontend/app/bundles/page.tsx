'use client'
import React from 'react'
import {useSearchParams} from 'next/navigation'
// import BundleCard, {BundleCardProps} from '../components/BundleCard'

const BundlePage = async () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  const res = await fetch('https://valorant-api.com/v1/bundles')
  const res_json = await res.json()
  const bundles = res_json.data

  // Filter bundles based on the search term
  const filteredBundles = search
    ? bundles.filter((bundle: any) => bundle.displayName.toLowerCase().includes((search as string).toLowerCase()))
    : bundles

  return (
    <main>
      <div className="flex flex-wrap gap-4 justify-center mt-10">
        {filteredBundles.length ? (
          filteredBundles.map((bundle: any) => (
            <div className="hover:scale-105 hover:opacity-50" key={bundle.uuid}>
              <h1>{bundle.displayName}</h1>
              <img src={bundle.displayIcon} />
              {/* <BundleCard
                key={bundle.uuid}
                uuid={bundle.uuid}
                displayName={bundle.displayName}
                displayIcon={bundle.displayIcon}
                description={bundle.description}
              /> */}
            </div>
          ))
        ) : (
          <p>No search results found. Try searching for a different bundle.</p>
        )}
      </div>
    </main>
  )
}

export default BundlePage
