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
      className="skin-card w-96 h-48 mb-4 border-solid-2 rounded-lg bg-black text-white p-5"
      key={uuid}
      onClick={() => router.push(`/skins/${uuid}`)}
    >
      <div className="text-center">
        <h1 className="text-lg mb-4">{displayName}</h1>
      </div>
      {displayIcon ? <Image src={displayIcon} alt="" height={400} width={800} loading="lazy" /> : <UnavailableImage />}
    </div>
  )
}

export default SkinCard
