import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export interface BundleCardProps {
  uuid: string
  displayName: string
  displayIcon: string
  description: string
}

const BundleCard: React.FC<BundleCardProps> = ({uuid, displayName, displayIcon, description}) => {
  return (
    <Link href={`/skins?search=${encodeURIComponent(displayName)}`}>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden w-96 h-64 flex flex-col">
        <div className="relative h-40">
          <Image
            src={displayIcon}
            alt={displayName}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-bold text-white mb-2 truncate">{displayName}</h2>
          {/* TODO: add price */}
          {/* <p className="text-gray-300 text-sm line-clamp-2">Price: Price goes here</p> */}
        </div>
      </div>
    </Link>
  )
}

export default BundleCard
