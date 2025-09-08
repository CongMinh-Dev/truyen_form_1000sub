import { http } from "./config";

export const quanLyDatChoSerV = {
  gheNgoi: (data) => {
    return http.post("/QuanLyDatVe/DatVe", data);
  },
};
