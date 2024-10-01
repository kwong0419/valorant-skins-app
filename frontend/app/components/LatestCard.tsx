'use client'
import React from 'react'
import stockImage from '../../public/images/valorant-gun-stock-image.webp'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

function LatestCard({index}: {index: string}) {
  const router = useRouter()

  return (
    <div className="card glass max-w-48 m-2 " key={index} onClick={() => router.push(`/skins/${index}`)}>
      <figure>
        <Image src={stockImage} alt="car!" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Skin</h2>
        <p>This is a description of the skin</p>
      </div>
    </div>
  )
}

export default LatestCard
