import React from 'react'

export default function Spinner({ size = "20px" }) {


  return (
    <div className={`w-[${size}] h-[${size}] cursor-default rounded-full border-[2px] border-t-[green] border-r-[rgba(255,255,255,.6)] border-b-[rgba(255,255,255,.6)] border-l-[rgba(255,255,255,.6)] animate-spin] animate-spin`}>
    </div>
  )
}
