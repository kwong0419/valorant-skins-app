import React from 'react'
import Image from 'next/image'
import missingIcon from '../../public/images/upsetSticker.png'

const UnavailableImage = () => {
  return (
    <div className="flex justify-center max-w-64 max-h-36">
      <Image src={missingIcon} alt="missingIcon" height={60} width={120} />
    </div>
  )
}

export default UnavailableImage
