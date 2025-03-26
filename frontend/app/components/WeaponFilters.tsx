'use client'
import {useRouter, useSearchParams} from 'next/navigation'
import {useState, useEffect} from 'react'
import SkinCard from './SkinCard'

const VALORANT_WEAPONS = [
  'Ares',
  'Bucky',
  'Bulldog',
  'Classic',
  'Frenzy',
  'Ghost',
  'Guardian',
  'Judge',
  'Melee',
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

interface Weapon {
  displayName: string
  category: string
  skins: []
}

interface SkinCardProps {
  uuid: string
  displayName: string
  displayIcon: string
}

const WeaponFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [weapons, setWeapons] = useState<string[]>(VALORANT_WEAPONS)
  const [meleeSkins, setMeleeSkins] = useState<any[]>([])

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const response = await fetch('https://valorant-api.com/v1/weapons')
        const data = await response.json()

        // Create a new weapons array, replacing 'Knife' with 'Melee'
        const weaponNames = data.data.map((weapon: Weapon) => {
          // If the weapon category includes 'Melee', return 'Melee'
          if (weapon.category.includes('Melee')) {
            return 'Melee'
          }
          return weapon.displayName
        })

        // Remove duplicates and sort
        const uniqueWeapons = Array.from(new Set(weaponNames)).sort() as string[]
        setWeapons(uniqueWeapons)
      } catch (error) {
        console.error('Error fetching weapons:', error)
        // Fallback to hardcoded weapons if API fails
        setWeapons(VALORANT_WEAPONS)
      }
    }

    fetchWeapons()
  }, [])

  // New useEffect to handle initial melee weapon filter
  useEffect(() => {
    const search = searchParams.get('search')
    if (search === 'Melee') {
      handleWeaponFilter('Melee')
    }
  }, [searchParams]) // Add searchParams as dependency

  const handleWeaponFilter = async (weapon: string) => {
    if (weapon === 'Melee') {
      try {
        const response = await fetch('https://valorant-api.com/v1/weapons')
        const data = await response.json()
        const meleeWeapon = data.data[data.data.length - 1]
        if (meleeWeapon && meleeWeapon.skins) {
          setMeleeSkins(meleeWeapon.skins)
        }
      } catch (error) {
        console.error('Error fetching melee weapons:', error)
        setMeleeSkins([])
      }
    } else {
      setMeleeSkins([]) // Clear melee skins when switching to another weapon
      router.push(`/skins?search=${weapon}`)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap gap-2 justify-center mt-6">
        {weapons.map((weapon) => (
          <button
            key={weapon}
            onClick={() => handleWeaponFilter(weapon)}
            className="px-3 py-1.5 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xs"
          >
            {weapon}
          </button>
        ))}
      </div>
      {meleeSkins.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          {meleeSkins.map(
            (skin: SkinCardProps) =>
              skin?.uuid &&
              !skin.displayName.includes('Standard') &&
              !skin.displayName.includes('Random Favorite') && (
                <div className="hover:scale-105 hover:opacity-50 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={skin.uuid}>
                  <SkinCard
                    uuid={skin.uuid}
                    displayName={skin.displayName || 'Unknown'}
                    displayIcon={skin.displayIcon || ''}
                  />
                </div>
              ),
          )}
        </div>
      )}
    </div>
  )
}

export default WeaponFilters
