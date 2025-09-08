import { http } from "./config";

export const quanLyNguoiDungServ = {
  dangNhap: (data) => {
    // khi sử dụng các phương thức từ axios đã được config(được cấu hình), tham số đầu tiên sẽ luôn là end point cho phần domain gọi tới api, tham số thứ 2 sẽ là dữ liệu được gửi lên cho backend và lưu ý tham số này luôn đặt tên là data
    return http.post("/QuanLyNguoiDung/DangNhap", data);
  },
  dangky: (data) => { 
    return http.post("/QuanLyNguoiDung/DangKy", data)
   },
  getUser: () => {
    return http.get("/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01")
  },
};


