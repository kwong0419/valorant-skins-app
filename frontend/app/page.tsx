import Link from 'next/link'
import HeroImage from '../public/images/valorant_hero.gif'
import Image from 'next/image'
import FeaturedBundle from './components/FeaturedBundle'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* hero section */}
      <div className="hero bg-base-200 py-12">
        <div className="hero-content flex-col md:flex-row items-center justify-between max-w-5xl w-full">
          <Image alt="valorant hero page" src={HeroImage} className=" rounded-lg shadow-2xl" />
          <div>
            <h2 className="text-l font-bold py-6">Search the latest skins</h2>
            <Link
              href="/skins"
              className="btn bg-customRed text-white hover:bg-white hover:text-black transition-colors duration-300"
            >
              View all Skins
            </Link>
          </div>
        </div>
      </div>
      {/* latest skins */}
      <div
        className="hero min-h-2"
        style={{
          backgroundColor: '#DE1138',
        }}
      >
        <div className="hero-content text-neutral-content text-center">
          {/* featured bundle section */}
          <div
            className="hero min-h-2 w-full py-36 flex flex-wrap justify-center"
            style={{
              backgroundColor: '#DE1138',
            }}
          >
            <FeaturedBundle />
          </div>
        </div>
      </div>
    </main>
  )
}
