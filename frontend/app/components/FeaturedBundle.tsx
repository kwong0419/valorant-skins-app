'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import Loader from './Loader'

interface BundleItem {
  uuid: string
  name: string
  image: string
  type: string
  base_price: number
  discounted_price: number
}

interface Bundle {
  bundle_uuid: string
  bundle_price: number
  items: BundleItem[]
  seconds_remaining: number
  displayName?: string
  displayIcon?: string
}

export default function FeaturedBundle() {
  const [bundleData, setBundleData] = useState<Bundle | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchBundleData = async () => {
      try {
        const [featuredRes, bundleInfoRes] = await Promise.all([
          fetch('/api/featured-bundle'),
          fetch('https://valorant-api.com/v1/bundles/'),
        ])

        if (!featuredRes.ok) {
          throw new Error(`Featured API failed: ${featuredRes.status}`)
        }

        const featuredData = await featuredRes.json()
        const bundleInfoData = await bundleInfoRes.json()

        // Check if we have valid data
        if (!featuredData.data || featuredData.data.length === 0) {
          console.log('No featured bundle data available')
          setHasError(true)
          return
        }

        // Get the featured bundle
        const featured = featuredData.data[0]
        
        // Check if featured has required properties
        if (!featured.bundle_uuid) {
          console.log('Featured bundle missing bundle_uuid')
          setHasError(true)
          return
        }

        // Find matching bundle info
        const bundleInfo = bundleInfoData.data.find((bundle: any) => bundle.uuid === featured.bundle_uuid)

        // Check if we found matching bundle info
        if (!bundleInfo) {
          console.log('No matching bundle info found')
          setHasError(true)
          return
        }

        // Combine the data
        setBundleData({
          ...featured,
          displayName: bundleInfo.displayName,
          displayIcon: bundleInfo.displayIcon,
        })
      } catch (error) {
        console.error('Error fetching bundle data:', error)
        setHasError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchBundleData()
  }, [])

  // Hide component if loading and no data yet
  if (loading && !bundleData) {
    return null
  }

  // Hide component if there's an error or no data
  if (hasError || !bundleData) {
    return null
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-white mb-8">Featured Bundle</h2>
      <Link href={`/skins?search=${bundleData.displayName}`} className="block max-w-2xl mx-auto">
        <div className="hover:scale-105 transition-transform duration-300">
          {bundleData.displayIcon && (
            <figure className="mb-4">
              <img
                src={bundleData.displayIcon}
                alt={bundleData.displayName}
                className="rounded-xl h-64 object-contain w-full"
              />
            </figure>
          )}
          <div className="rounded-b-xl p-4 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">{bundleData.displayName}</h3>
            <p className="text-white text-xl font-bold">{bundleData.bundle_price} VP</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
