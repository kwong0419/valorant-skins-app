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
      className="skin-card w-60 h-48 m-4 rounded-lg bg-black text-white p-4"
      key={uuid}
      onClick={() => router.push(`/skins/${uuid}`)}
    >
      <div className="text-center">
        <h1 className="text-lg mb-2 max-w-64">{displayName}</h1>
      </div>
      {displayIcon ? (
        <Image className="w-full h-24 object-contain" src={displayIcon} alt="" height={96} width={240} loading="lazy" />
      ) : (
        <UnavailableImage />
      )}
    </div>
  )
}

export default SkinCard
