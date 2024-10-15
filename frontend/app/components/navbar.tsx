'use client'
import React, {useState, useRef, useEffect} from 'react' // Import useEffect
import Link from 'next/link'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null) // Create a ref for the input

  const handleSearchButtonClick = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  // Focus the input when it opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus() // Focus the input when opened
    }
  }, [isSearchOpen]) // Dependency on isSearchOpen

  const clearSearch = () => {
    setSearchTerm('') // Clear the search term
    if (searchInputRef.current) {
      searchInputRef.current.focus() // Refocus the input after clearing
    }
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-customRed rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={'/skins'} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  Skins
                </Link>
              </li>
              <li>
                <Link href={'/bundles'} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  Bundles
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="navbar-center">
        <Link href={'/'} className="btn btn-ghost text-xl">
          Valorant Skins
        </Link>
      </div>
      <div className="navbar-end">
        {/* Search Button */}
        <button className="btn btn-ghost btn-circle" onClick={handleSearchButtonClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        {isSearchOpen && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              // Redirect to the skin page with the search term
              window.location.href = `/skins?search=${searchTerm}`
            }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search skins..."
                className="input input-bordered ml-2 pr-10" // Add padding for the clear button
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                ref={searchInputRef} // Attach the ref to the input
              />
              {searchTerm && ( // Show clear button only if there is text
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-2"
                  onClick={clearSearch}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Navbar
