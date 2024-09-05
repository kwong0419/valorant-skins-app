'use client'
import React from 'react'

interface Skin {
  uuid: string
  displayName: string
  displayIcon: string
}

const UsersPage = async () => {
  const res = await fetch('https://valorant-api.com/v1/weapons/skins')
  const res_json = await res.json()
  const skins: Skin[] = res_json.data

  console.log(skins)
  // debugger

  return (
    <main>
      <>
        <h1>Skins</h1>
        <ul>
          {skins.map((skin) => (
            <>
              <li key={skin.uuid}>{skin.displayName}</li>
              <img src={skin.displayIcon} />
            </>
          ))}
        </ul>
      </>
    </main>
  )
}

export default UsersPage
