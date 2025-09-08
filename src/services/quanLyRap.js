import { http } from "./config";

export const quanLyRapServ = {
  getAllThongTinCumRap() {
    return http.get("/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01");
  },
  getLichChieu(maLichChieu) {
    return http.get(
      `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  },
  getAllThongTinLichChieu:(maPhim) => {
    return http.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    
  }
};
