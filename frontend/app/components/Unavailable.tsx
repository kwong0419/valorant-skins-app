import React from 'react'
import Image from 'next/image'
import missingIcon from '../../public/images/upsetSticker.png'

const UnavailableCard = () => {
  return (
    <div>
      <Image src={missingIcon} alt="missingIcon" height={50} width={100} />
    </div>
  )
}

export default UnavailableCard
