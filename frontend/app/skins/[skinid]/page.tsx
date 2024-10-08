'use client'

import React, {useRef, useEffect, useState} from 'react'
import {notFound} from 'next/navigation'
import Image from 'next/image'
import UnavailableImage from '@/app/components/Unavailable'

function SkinItem({params}: {params: {skinId: string}}) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [skinItemData, setSkinItemData] = useState<any>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal()
    }
  }

  useEffect(() => {
    const fetchSkinData = async () => {
      const res = await fetch(`https://valorant-api.com/v1/weapons/skins/${params.skinId}`)
      const res_json = await res.json()
      setSkinItemData(res_json.data)
    }
    fetchSkinData()
  }, [params.skinId])

  if (!skinItemData) return <div>Loading...</div>

  return (
    <div>
      <div className="main-body flex justify-between">
        <div className="column flex-1 m-2.5">
          {skinItemData.displayIcon ? (
            <Image src={skinItemData.displayIcon} alt="" height={400} width={800} loading="lazy" />
          ) : (
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-bold">Image Unavailable</h1>
              <UnavailableImage />
            </div>
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
                <button
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                  onClick={() => modalRef.current?.close()}
                  aria-label="Close"
                >
                  ✕
                </button>
                <h3 className="font-bold text-lg">{skinItemData.displayName}</h3>
                {skinItemData.chromas.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    <h4 className="col-span-2 font-semibold">Chromas:</h4>
                    {skinItemData.chromas.map((chroma: any) => (
                      <div key={chroma.uuid} className="flex flex-col items-center">
                        <h5 className="text-center">{chroma.displayName}</h5>
                        <Image
                          src={chroma.displayIcon}
                          alt={chroma.displayName}
                          height={250}
                          width={500}
                          className="rounded-lg shadow-md"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No chromas available.</p>
                )}
                {skinItemData.levels.length > 0 ? (
                  <div>
                    <h4>Levels:</h4>
                    {skinItemData.levels.map((level: any) => (
                      <button
                        key={level.uuid}
                        className="btn btn-primary m-1" // DaisyUI button classes
                        onClick={() => {
                          setSelectedVideo(level.streamedVideo) // Set new video
                        }}
                      >
                        {level.displayName.charAt(level.displayName.length - 1)}
                      </button>
                    ))}
                    {selectedVideo && (
                      <video key={selectedVideo} controls>
                        <source src={selectedVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ) : (
                  <p>No streamed videos available.</p>
                )}

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
