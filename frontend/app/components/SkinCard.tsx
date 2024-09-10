'use client'
import React from 'react'
import Image from 'next/image'
import UnavailableCard from './Unavailable'

export interface SkinCardProps {
  uuid: string
  displayName: string
  displayIcon: string
}

const SkinCard: React.FC<SkinCardProps> = ({uuid, displayName, displayIcon}) => {
  return (
    <div className="skin-card ">
      <h1>{displayName}</h1>
      {displayIcon ? <Image src={displayIcon} alt="" height={200} width={400} loading="lazy" /> : <UnavailableCard />}
    </div>
  )
}

export default SkinCard
