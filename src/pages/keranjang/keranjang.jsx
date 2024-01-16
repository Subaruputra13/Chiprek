import React, { useEffect, useState } from "react";
import { useCartByCustomerId } from "./../menu/useMenu";
import { Button, ConfigProvider, Typography, FloatButton } from "antd";
import { RUPIAH } from "../../helper/helper";
import { useDeleteCart } from "./useKeranjang";
import { useNavigate } from "react-router-dom";

export const Keranjang = () => {
  const [isLoadingGetCart, dataCart, getCart] = useCartByCustomerId();
  const [isLoadingDeleteCart, dataDeleteCart, deleteCart] = useDeleteCart();
  const navigate = useNavigate();

  const { Text } = Typography;

  const handleDeleteCart = (id) => {
    const body = {
      cart_item_id: id,
    };

    console.log(body);

    deleteCart(body, () => {
      getCart();
    });
  };

  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      {dataCart && (
        <>
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-11 headcol border border-1 rounded-2 py-1 mt-4">
                <p className="identitas my-1 text-center">Keranjang</p>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row d-flex justify-content-start">
              <div className="col-12 py-1 mt-4">
                <p
                  className="my-2 mx-2"
                  style={{ fontSize: 20, fontWeight: "bold" }}
                >
                  Detail Pesanan
                </p>
              </div>
            </div>

            <div className="row d-flex justify-content-start">
              <div className="col-12">
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: "#E41C1F",
                        colorPrimaryHover: "#E41C1F",
                        fontWeight: "bold",
                      },
                    },
                  }}
                >
                  <Button
                    className="btPemesan px-5"
                    size="large"
                    shape="round"
                    htmlType="submit"
                    type="primary"
                    style={{ fontSize: "medium" }}
                    onClick={() => {
                      navigate("/menu");
                    }}
                  >
                    Tambah Pesanan
                  </Button>
                </ConfigProvider>
              </div>
            </div>
          </div>

          {dataCart.CartItem.map((item) => (
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

              <div className="row d-flex justify-content-start ms-1">
                <div className="col-3">
                  <p style={{ fontSize: 15, fontWeight: "bold" }}>
                    <Button
                      type="link"
                      danger
                      onClick={() => {
                        handleDeleteCart(item.ID);
                      }}
                    >
                      Remove
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="container">
            <div className="row d-flex justify-content-start">
              <div className="col-12 mt-4">
                <p
                  className="mx-2"
                  style={{ fontSize: 20, fontWeight: "bold" }}
                >
                  Total
                </p>
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
                {dataCart.total_item} Item
              </div>
            </div>
            <div className="row d-flex justify-content-start">
              <div className="col-8"></div>
              <div className="col-4">
                <p
                  className=""
                  style={{ fontSize: 20, fontWeight: "bold", color: "red" }}
                >
                  {RUPIAH(dataCart.total_price)}
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
              <div className="row d-flex justify-content-start">
                <FloatButton
                  shape="square"
                  style={{
                    position: "sticky",
                    width: 350,
                    height: 60,
                    left: "5%",
                    bottom: 100,
                  }}
                  description={
                    <div className="container textKeranjang">
                      <div className="row">
                        <div className="col-12 ">Pesan Sekarang</div>
                      </div>
                    </div>
                  }
                  onClick={() => {
                    navigate("/Pembayaran");
                  }}
                />
              </div>
            </ConfigProvider>
          </div>
        </>
      )}
    </>
  );
};
