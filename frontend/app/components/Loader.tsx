import React from 'react'
import Image from 'next/image'
import spinner from '../../public/images/knife-spin.gif'

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Image src={spinner} alt="LoadingSpinner" />
    </div>
  )
}

export default Loader
