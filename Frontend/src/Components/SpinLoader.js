import React from 'react'
import SpinnerImage from '../Images/SpinnerImage.gif'
import '../Styles/SpinLoader.css'

export default function SpinLoader() {
  return (
      <div className="spin-loader">
        <img src={SpinnerImage} alt="loading" />
      </div>
  )
}
