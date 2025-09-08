import { http } from "./config";

export const quanLyPhimServ = {
  getAllBanner: () => {
    return http.get("/QuanLyPhim/LayDanhSachBanner");
  },
  getAllMovie: () => {
    return http.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
  themPhimUploadHinh: (data) => {
    return http.post("/QuanLyPhim/ThemPhimUploadHinh", data);
  },
  getInforMovie: (movieCodes) => {
    return http.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieCodes}`);
  },
  getMoviePage: (page) => {
    return http.get(
      `/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP0${page}&soTrang=1&soPhanTuTrenTrang=8`
    );
  },
  getInforMovie: (movieCodes) => {
    return http.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieCodes}`);
  },
};
