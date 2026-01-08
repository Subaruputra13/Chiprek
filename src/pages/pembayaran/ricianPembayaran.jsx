import React, { useEffect, useState } from "react";
import { Images } from "../home/images";
import { Modal, Typography } from "antd";
import { useTransactionByCustomerId } from "./usePembayaran";
import { FORMAT_DATE, FORMAT_DATETIME, RUPIAH } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import { FloatButton, ConfigProvider } from "antd";
import Cookies from "js-cookie";

const { Text } = Typography;

export const RincianPembayaran = () => {
  const [dataTransactionByCustomerId, getTransactionByCustomerId] =
    useTransactionByCustomerId();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const openInNewTab = (URL) => {
    window.open(URL + "?utm_source=chiprek", "_blank");
  };

  // const closeModal = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    getTransactionByCustomerId();
  }, []);

  return (
    <>
      {dataTransactionByCustomerId && (
        <>
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-11 headcol border border-1 rounded-2 py-1 mt-4">
                <p className="identitas my-1 text-center">Resi pembayaran</p>
              </div>
            </div>
          </div>

          <Images />

          <div className="container">
            <div className="row d-flex justify-content-center">
              <h6
                className="text-center"
                style={{ fontWeight: "bolder", fontSize: 18 }}
              >
                Chiprek! The Authentic Ayam Geprek
              </h6>
              <Text
                type="secondary"
                className="text-center"
                style={{ fontSize: 17 }}
              >
                Jl. H. M. Tohir No.8, RT.04/RW.01, Pondok Cina, Kecamatan Beji,
                Kota Depok, Jawa Barat 16424
              </Text>
            </div>
          </div>

          <div className="container">
            <hr className="my-2" />
          </div>

          <div className="container mb-4">
            <div className="row d-flex justify-content-center">
              <div className="col-6">Pelanggan</div>
              <div className="col-6">Tanggal Makan</div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-6" style={{ fontWeight: "bold" }}>
                {dataTransactionByCustomerId.customer_name}
              </div>
              <div className="col-6" style={{ fontWeight: "bold" }}>
                {FORMAT_DATE(dataTransactionByCustomerId.CreatedAt)}
              </div>
            </div>
          </div>

          <div className="container mb-4">
            <div className="row d-flex justify-content-center">
              <div className="col-6">Jenis Pesanan</div>
              <div className="col-6">Nomor Telepon</div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-6" style={{ fontWeight: "bold" }}>
                {dataTransactionByCustomerId.order_type}
              </div>
              <div className="col-6" style={{ fontWeight: "bold" }}>
                {dataTransactionByCustomerId.phone_number}
              </div>
            </div>
          </div>

          <div className="container mb-4">
            <div className="row d-flex justify-content-center">
              <div className="col-6">Kode Transaksi</div>
              <div className="col-6">Waktu Transaksi</div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-6" style={{ fontWeight: "bold" }}>
                {dataTransactionByCustomerId.order_id}
              </div>
              <div className="col-6" style={{ fontWeight: "bold" }}>
                {FORMAT_DATETIME(dataTransactionByCustomerId.CreatedAt)}
              </div>
            </div>
          </div>

          <div className="container mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-6">Pembayaran</div>
              <div className="col-6">Status</div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-6" style={{ fontWeight: "bold" }}>
                {dataTransactionByCustomerId.payment_method === "bank_transfer"
                  ? "Transfer Bank"
                  : dataTransactionByCustomerId.payment_method === "gopay"
                  ? "Gopay"
                  : dataTransactionByCustomerId.payment_method === "qris"
                  ? "Qris"
                  : dataTransactionByCustomerId.payment_method === "shopeepay"
                  ? "Shopeepay"
                  : dataTransactionByCustomerId.payment_method === "ovo"
                  ? "Ovo"
                  : dataTransactionByCustomerId.payment_method === "dana"
                  ? "Dana"
                  : dataTransactionByCustomerId.payment_method}
              </div>
              <div
                className="col-6"
                style={{
                  fontWeight: "bold",
                  color:
                    dataTransactionByCustomerId.status === "Waiting for Payment"
                      ? "#E41C1F"
                      : "#65B741",
                }}
              >
                {dataTransactionByCustomerId.status === "Waiting for Payment"
                  ? "Pending"
                  : "Paid"}
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col">
                <h4 style={{ fontWeight: "bolder" }}>Detail Pesanan</h4>
                <hr className="my-2" />
              </div>
            </div>
          </div>
          {dataTransactionByCustomerId.Cart.CartItem.map((item) => (
            <div className="container" key={item.ID}>
              <div className="row d-flex justify-content-start pt-2">
                <div className="col-1 ">
                  <p style={{ fontSize: 17, fontWeight: "bold", color: "red" }}>
                    {item.quantity}
                  </p>
                </div>

                <div className="col-7">
                  <p style={{ fontSize: 17, fontWeight: "bold" }}>
                    {item.Menu.name}
                  </p>
                </div>

                <div className="col-4">
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "red",
                      textAlign: "right",
                    }}
                  >
                    {RUPIAH(item.Menu.price)}
                  </p>
                </div>
              </div>

              <div className="row d-flex justify-content-start ms-1">
                <Text italic style={{ fontSize: 12, paddingLeft: 27 }}>
                  {item.note != null ? item.note : ""}
                </Text>
              </div>
            </div>
          ))}

          <div className="container">
            <div className="row d-flex justify-content-start">
              <div className="col-12">
                <p style={{ fontSize: 20, fontWeight: "bold" }}>Total</p>
              </div>
            </div>
            <div className="row d-flex justify-content-start">
              <div className="col-8"></div>
              <div
                className="col-4"
                style={{
                  paddingLeft: 60,
                }}
              >
                {dataTransactionByCustomerId.Cart.total_item} Item
              </div>
            </div>
            <div className="row d-flex justify-content-start">
              <div className="col-8"></div>
              <div className="col-4">
                <p
                  className=""
                  style={{ fontSize: 20, fontWeight: "bold", color: "red" }}
                >
                  {RUPIAH(dataTransactionByCustomerId.Cart.total_price)}
                </p>
              </div>
            </div>
            <ConfigProvider
              theme={{
                token: {
                  colorBgElevated: "#E31A1D",
                  colorText: "#FFFFFF",
                },
              }}
            >
              <div className="container mb-4">
                <div className="row d-flex justify-content-start">
                  {/* Button untuk membayar dan pesan lagi */}
                  <div className="col-6">
                    <FloatButton
                      shape="square"
                      style={{
                        position: "sticky",
                        width: 170,
                        height: 60,
                        left: "5%",
                        bottom: 100,
                      }}
                      description={
                        <div
                          className="container"
                          style={{ fontSize: 25, fontWeight: "bolder" }}
                        >
                          <div className="row">
                            <div className="col-12 ">Membayar</div>
                          </div>
                        </div>
                      }
                      onClick={() => {
                        openInNewTab(
                          `${dataTransactionByCustomerId.payment_url}`
                        );
                      }}
                    />
                  </div>

                  {/* Button untuk memesan kembali */}
                  <div className="col-6">
                    <FloatButton
                      shape="square"
                      style={{
                        position: "sticky",
                        width: 170,
                        height: 60,
                        left: "5%",
                        bottom: 100,
                      }}
                      description={
                        <div
                          className="container"
                          style={{ fontSize: 22, fontWeight: "bolder" }}
                        >
                          <div className="row">
                            <div className="col-12 ">Pesan Lagi?</div>
                          </div>
                        </div>
                      }
                      onClick={() => {
                        navigate("/", Cookies.remove("token"));
                      }}
                    />
                  </div>
                </div>
              </div>
            </ConfigProvider>
          </div>
        </>
      )}
    </>
  );
};
