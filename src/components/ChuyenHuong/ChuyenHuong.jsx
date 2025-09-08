import React from 'react'
import { NavLink } from 'react-router-dom'

const ChuyenHuong = () => {
    return (
        <div>
            <NavLink to={"/down"}> <button className='bg-blue-700 text-white p-2 rounded-xl mt-2 ml-2'>Tải ảnh</button> </NavLink>
            <NavLink to={"/gop"}> <button className='bg-blue-700 text-white p-2 rounded-xl mt-2 ml-2'>Gộp ảnh</button> </NavLink>
            <NavLink to={"/drop"}> <button className='bg-blue-700 text-white p-2 rounded-xl mt-2 ml-2'>Cắt, aware ảnh</button> </NavLink>
            <NavLink to={"/trung"}> <button className='bg-blue-700 text-white p-2 rounded-xl mt-2 ml-2'>Xóa ảnh trùng</button> </NavLink>
            <NavLink to={"/xulydata"}> <button className='bg-blue-700 text-white p-2 rounded-xl mt-2 ml-2'>Xử lý data</button> </NavLink>
            <NavLink to={"/mp3"}> <button className='bg-blue-700 text-white p-2 rounded-xl mt-2 ml-2'>Tạo âm thanh</button> </NavLink>
            <NavLink to={"/gop-mp3"}> <button className='bg-blue-700 text-white p-2 rounded-xl mt-2 ml-2'>Gộp âm thanh</button> </NavLink>
            <NavLink to={"/xoa-text"}> <button className='bg-blue-700 text-white p-2 rounded-xl mt-2 ml-2'>Xóa chữ</button> </NavLink>
            <NavLink to={"/up"}> <button className='bg-blue-700 text-white p-2 rounded-xl mt-2 ml-2'>Chạy</button> </NavLink>
        </div>
    )
}

export default ChuyenHuong
