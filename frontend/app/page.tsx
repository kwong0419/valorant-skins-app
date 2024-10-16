import Link from 'next/link'
import HeroImage from '../public/images/valorant_hero.gif'
// import BackgroundImage from '../public/images/valorant-background.jpg'
// import stockImage from '../public/images/valorant-gun-stock-image.webp'
// import Navbar from './components/navbar'
import Image from 'next/image'
import LatestCard from './components/LatestCard'

export default function Home() {
  const array = ['1', '2', '3', '4']
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* hero section */}
      <div className="hero bg-base-200 py-12">
        <div className="hero-content flex-col md:flex-row items-center justify-between max-w-5xl w-full">
          <Image alt="valorant hero page" src={HeroImage} className=" rounded-lg shadow-2xl" />
          <div>
            <h2 className="text-l font-bold py-6">Search the latest skins</h2>
            <Link href="/skins" className="btn btn-primary">
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
        {/* <div className="hero-overlay"></div> */}
        <div className="hero-content text-neutral-content text-center">
          <div>
            <h1 className="mb-5 text-5xl font-bold color">Featured Bundle</h1>
            <div className="flex flex-wrap justify-center ">
              {array.map((index) => {
                return <LatestCard key={index} index={index} />
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
