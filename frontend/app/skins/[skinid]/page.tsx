'use client'

import React, {useRef, useEffect, useState} from 'react'
import {notFound} from 'next/navigation'
import Image from 'next/image'
import UnavailableImage from '@/app/components/Unavailable'

function SkinItem({params}: {params: {skinId: string}}) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [skinItemData, setSkinItemData] = useState<any>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [videoClicked, setVideoClicked] = useState(false)

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center m-2.5">
        {skinItemData.displayIcon ? (
          <Image src={skinItemData.displayIcon} alt="" height={400} width={800} loading="lazy" />
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold">Image Unavailable</h1>
            <UnavailableImage />
          </div>
        )}
        <h2 className="card-title text-center mt-4">{skinItemData.displayName}</h2>
        <p className="text-center">Price goes here</p>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary" onClick={openModal}>
            Skin Details
          </button>
        </div>
      </div>

      <dialog id="skin-modal" className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-5xl relative">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => modalRef.current?.close()}
            aria-label="Close"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg text-center">{skinItemData.displayName}</h3>
          {skinItemData.chromas.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <h4 className="col-span-2 font-semibold text-center">Chromas:</h4>
              {skinItemData.chromas.map((chroma: any) => (
                <div key={chroma.uuid} className="flex flex-col items-center">
                  <h5 className="text-center">{chroma.displayName}</h5>
                  <Image src={chroma.displayIcon} alt={chroma.displayName} height={250} width={500} />
                </div>
              ))}
            </div>
          ) : (
            <p>No chromas available.</p>
          )}
          {skinItemData.levels.length > 0 ? (
            <div className="mt-4">
              <h4 className="text-center">Levels:</h4>
              <div className="flex justify-center flex-wrap mt-2">
                {skinItemData.levels.map((level: any, index: number) => (
                  <button
                    key={level.uuid}
                    className="btn btn-primary m-1"
                    onClick={() => {
                      if (level.streamedVideo) {
                        setSelectedVideo(level.streamedVideo)
                      } else {
                        setSelectedVideo(null)
                      }
                      setVideoClicked(true)
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              {selectedVideo ? (
                <video key={selectedVideo} controls className="mt-4">
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                videoClicked && <p>Video is currently unavailable.</p> // Message if video is not available and button was clicked
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
  )
}

export default SkinItem
