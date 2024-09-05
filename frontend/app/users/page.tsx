'use client'
import React from 'react'

interface skin {
  uuid:string
  displayName: string
}

const UsersPage = async () => {
  const res = await fetch('https://valorant-api.com/v1/weapons/skins')
  const data = await res.json()
  const skins: skin[] = data.data
    console.log('skins', skins)
//   debugger
  console.log("hello")
  console.log("hello")

  return (
    <main>
      <>
        <h1>Users</h1>
        <p>{new Date().toLocaleTimeString()}</p>
        <ul>
          {skins.map((skin) => (
            <li key={skin.uuid}>{skin.displayName}</li>
          ))}
        </ul>
      </>
    </main>
  )
}

export default UsersPage
