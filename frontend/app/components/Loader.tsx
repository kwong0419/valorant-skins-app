import React from 'react'
import Image from 'next/image'
import spinner from '../../public/images/knife-spin.gif'

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <h1 className="text-white text-4xl font-bold mb-4">Loading...</h1>
      <Image src={spinner} alt="LoadingSpinner" className="rounded-full object-cover w-96 h-96" />
    </div>
  )
}

export default Loader
