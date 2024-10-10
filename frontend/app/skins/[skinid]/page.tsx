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
      if (res_json.data) {
        setSkinItemData(res_json.data)
      }
    }
    fetchSkinData()
  }, [params.skinId])

  if (!skinItemData) return <div>Loading...</div>

  console.log('Display Icon:', skinItemData.displayIcon)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center m-2.5">
        {skinItemData.displayIcon ? (
          <img
            className="w-full h-24 object-contain"
            alt=""
            src={skinItemData.displayIcon}
            height={400}
            width={400}
            loading="lazy"
          />
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold">Image Unavailable</h1>
            <UnavailableImage />
          </div>
        )}
        <h2 className="card-title text-center mt-40">{skinItemData.displayName}</h2>
        <p className="text-center">Price goes here</p>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary" onClick={openModal}>
            Skin Details
          </button>
        </div>
      </div>

      <dialog id="skin-modal" className="modal" ref={modalRef} onClick={() => modalRef.current?.close()}>
        <div className="modal-box w-11/12 max-w-5xl relative" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => modalRef.current?.close()}
            aria-label="Close"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg text-center">{skinItemData.displayName}</h3>
          {skinItemData.chromas.length > 0 ? (
            <div
              className={`grid ${
                skinItemData.chromas.length === 1 ? 'flex justify-center' : 'grid-cols-2'
              }  gap-4 mt-4`}
            >
              <h4 className="col-span-2 font-semibold text-center">Chromas:</h4>
              {skinItemData.chromas.map((chroma: any) => (
                <div key={chroma.uuid} className="flex flex-col items-center">
                  <img
                    className="w-full h-24 object-contain"
                    src={chroma.displayIcon}
                    alt=""
                    height={200}
                    width={200}
                    loading="lazy"
                  />
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
          <div className="modal-action flex justify-center">
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
