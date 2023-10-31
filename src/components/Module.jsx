import React from 'react'
import './Module.scss'
import img from "../images/user.png"

const Module = () => {
  return (
    <div className='module'>
        <div className='div__h4'>
            <h4 className='h4'>THE <span className='span'>PRODUCT</span> PLATFORM</h4>
            <img className='img' src={img}/>
        </div>
        <div class="circle">
            <div class="long-arrow-right"></div>
        </div>

    </div>
  )
}

export default Module