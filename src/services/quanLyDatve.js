import { http } from "./config"

export const quanLyDatve = {
    layDanhSachPhongVe: (maLichChieu) => {
     return http.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    },
    
}