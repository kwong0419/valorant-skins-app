import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()
  const appVersion = '0.1.0' // You can update this version number as needed

  return (
    <footer className="bg-base-100 text-gray-300 mt-auto py-6">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-500 sm:justify-start">
            <svg className="h-8" viewBox="0 0 118 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG path data */}
            </svg>
          </div>

          <div className="mt-4 text-center text-sm sm:mt-0 sm:text-right">
            <p>Copyright &copy; {currentYear} KW & DM Inc.</p>
            <p className="mt-1">
              <span className="font-semibold text-customRed">Valorant Skins App™</span> v{appVersion} (Alpha)
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
