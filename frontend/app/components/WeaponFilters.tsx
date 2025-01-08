'use client'
import {useRouter} from 'next/navigation'

const VALORANT_WEAPONS = [
  'Ares',
  'Bucky',
  'Bulldog',
  'Classic',
  'Frenzy',
  'Ghost',
  'Guardian',
  'Judge',
  'Knife',
  'Marshal',
  'Odin',
  'Operator',
  'Phantom',
  'Sheriff',
  'Shorty',
  'Spectre',
  'Stinger',
  'Vandal',
]

const WeaponFilters = () => {
  const router = useRouter()

  const handleWeaponFilter = (weapon: string) => {
    router.push(`/skins?search=${weapon}`)
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex flex-wrap gap-2 justify-center mt-6">
        {VALORANT_WEAPONS.map((weapon) => (
          <button
            key={weapon}
            onClick={() => handleWeaponFilter(weapon)}
            className="px-3 py-1.5 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xs"
          >
            {weapon}
          </button>
        ))}
      </div>
    </div>
  )
}

export default WeaponFilters
