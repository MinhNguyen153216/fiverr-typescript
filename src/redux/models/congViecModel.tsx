export interface congViecModel {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai: DsNhomChiTietLoai[];
}
export interface DsNhomChiTietLoai {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongViec: number;
  dsChiTietLoai: DsChiTietLoai[];
}
export interface DsChiTietLoai {
  id: number;
  tenChiTiet: string;
}

///
export interface CongViecChiTiet {
  id: number;
  congViec: CongViec;
  tenLoaiCongViec: string;
  tenNhomChiTietLoai: string;
  tenChiTietLoai: string;
  tenNguoiTao: string;
  avatar: string;
}

export interface CongViec {
  id?: number;
  tenCongViec: string;
  danhGia?: any;
  giaTien: number;
  nguoiTao?: number;
  hinhAnh?: string;
  moTa?: string;
  maChiTietLoaiCongViec?: number;
  moTaNgan: string;
  saoCongViec?: number;
}
// Thue Cong viec
export interface ThueCongViec {
  id: number;
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanThanh: boolean;
}
