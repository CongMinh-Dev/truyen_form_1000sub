import React, { useState } from 'react'

const KiemTraImg = () => {
    let [img, setImg] = useState("")
    let handleChange = (value) => {
        setImg(value)

    }


    return (
        <div>
            <input type="text" onChange={(e) => {
                handleChange(e.target.value)
            }} className='bg-red-200' />
            <img src={img} alt="" className='w-[20%]' />
        </div>
    )
}

export default KiemTraImg
