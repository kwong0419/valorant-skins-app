'use client'

import React, {useRef} from 'react'
import {notFound} from 'next/navigation'
import Image from 'next/image'

async function SkinItem({params}: {params: {skinId: string}}) {
  const modalRef = useRef<HTMLDialogElement>(null)

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal()
    }
  }

  const res = await fetch(`https://valorant-api.com/v1/weapons/skins/${params.skinId}`)
  const res_json = await res.json()
  const skinItemData = res_json.data

  return (
    <div>
      <div className="main-body flex justify-between">
        <div className="column flex-1 m-2.5">
          {skinItemData.displayIcon && (
            <Image src={skinItemData.displayIcon} alt="" height={400} width={800} loading="lazy" />
          )}
        </div>
        <div className="column flex-1 m-2.5">
          <h2 className="card-title">{skinItemData.displayName}</h2>
          <p>Price goes here</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={openModal}>
              Skin Details
            </button>
            <dialog id="skin-modal" className="modal" ref={modalRef}>
              <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">{skinItemData.displayName}</h3>
                <p className="py-4">Click the button below to close</p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkinItem
