import Link from 'next/link'
import SkinCard from './components/SkinCard'
import HeroImage from '../public/images/valorant_hero.gif'
import BackgroundImage from '../public/images/valorant-background.jpg'
// import stockImage from '../public/images/valorant-gun-stock-image.webp'
import Navbar from './components/Navbar'
import Image from 'next/image'
import LatestCard from './components/LatestCard'

export default function Home() {
  const array = ['1', '2', '3', '4']
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* hero section */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col md:flex-row">
          <Image alt="valorant hero page" src={HeroImage} className=" rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Valorant Skins!</h1>
            <p className="py-6">Search the latest skins</p>
            <button className="btn btn-primary">Get Started</button>
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
            <h1 className="mb-5 text-5xl font-bold color">Lastest</h1>
            <div className="flex">
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
