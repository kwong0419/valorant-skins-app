import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import missingIcon from '../public/images/upsetSticker.png'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-white">
      <div className="text-center p-8 rounded-lg">
        <Image src={missingIcon} alt="404 Icon" height={120} width={240} className="mb-8" />
        <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-gray-300 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="btn bg-customRed text-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
