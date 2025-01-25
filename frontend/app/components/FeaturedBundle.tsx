'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'
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

  useEffect(() => {
    const fetchBundleData = async () => {
      try {
        const [featuredRes, bundleInfoRes] = await Promise.all([
          fetch(`https://api.henrikdev.xyz/valorant/v2/store-featured?api_key=${process.env.HENRIKDEV_API_KEY}`),
          fetch('https://valorant-api.com/v1/bundles'),
        ])

        const featuredData = await featuredRes.json()
        const bundleInfoData = await bundleInfoRes.json()

        // Get the featured bundle
        const featured = featuredData.data[0]
        // Find matching bundle info
        const bundleInfo = bundleInfoData.data.find((bundle: any) => bundle.uuid === featured.bundle_uuid)

        // Combine the data
        setBundleData({
          ...featured,
          displayName: bundleInfo?.displayName,
          displayIcon: bundleInfo?.displayIcon,
        })
      } catch (error) {
        console.error('Error fetching bundle data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBundleData()
  }, [])

  if (loading) {
    return (
      <div className="w-full min-h-screen fixed top-0 left-0 z-50 bg-black">
        <Loader />
      </div>
    )
  }

  if (!bundleData) return null

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
