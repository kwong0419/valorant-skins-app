'use client'

import React, {useRef, useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import UnavailableImage from '@/app/components/Unavailable'
import Loader from '@/app/components/Loader'

function SkinItem({params}: {params: {skinId: string}}) {
  const router = useRouter()
  const modalRef = useRef<HTMLDialogElement>(null)
  const [skinItemData, setSkinItemData] = useState<any>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [videoClicked, setVideoClicked] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

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

  if (!skinItemData) return <Loader />

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
          <button
            className="btn bg-customRed text-white hover:bg-white hover:text-black transition-colors"
            onClick={openModal}
          >
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
                        setVideoClicked(true)
                        // Add a small delay to ensure the video element is rendered
                        setTimeout(() => {
                          if (videoRef.current) {
                            videoRef.current.play()
                          }
                        }, 100)
                      } else {
                        setSelectedVideo(null)
                        setVideoClicked(true)
                      }
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              {selectedVideo ? (
                <video key={selectedVideo} ref={videoRef} controls className="mt-4" autoPlay>
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                videoClicked && <p>Video is currently unavailable.</p>
              )}
            </div>
          ) : (
            <p>No streamed videos available.</p>
          )}
          <div className="modal-action flex justify-center">
            <form method="dialog">
              <button className="btn bg-base-300 hover:bg-customDarkerRed hover:text-white transition-colors">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <button
        className="btn bg-black text-white hover:bg-white hover:text-black transition-colors"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  )
}

export default SkinItem
