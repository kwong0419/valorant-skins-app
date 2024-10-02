'use client'
import React from 'react'
import Image from 'next/image'
import UnavailableImage from './Unavailable'
import {useRouter} from 'next/navigation'

export interface SkinCardProps {
  uuid: string
  displayName: string
  displayIcon: string
}

const SkinCard: React.FC<SkinCardProps> = ({uuid, displayName, displayIcon}) => {
  const router = useRouter()

  return (
    <div
      className="skin-card min-w-72 min-h-40 mb-4 border-solid-2 rounded-lg bg-black text-white p-5"
      key={uuid}
      onClick={() => router.push(`/skins/${uuid}`)}
    >
      <div className="text-center">
        <h1 className="text-lg mb-4 max-w-64">{displayName}</h1>
      </div>
      {displayIcon ? (
        <Image className="max-w-64 max-h-36" src={displayIcon} alt="" height={192} width={384} loading="lazy" />
      ) : (
        <UnavailableImage />
      )}
    </div>
  )
}

export default SkinCard
