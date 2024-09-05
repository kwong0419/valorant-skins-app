import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Valorant Skins</h1>
      <Link href="/skins">Skin Viewer</Link>
      <ProductCard />
    </main>
  )
}
