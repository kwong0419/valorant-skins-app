import React from 'react'
import Image from 'next/image'
import spinner from '../../public/images/knife-spin.gif'

const Loader = () => {
  return <Image src={spinner} alt="LoadingSpinner" />
}

export default Loader
