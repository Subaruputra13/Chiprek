import React, { useEffect, useState } from "react";
import { Forms } from "../home/form";
import { ConfigProvider, Form, Input, Button, Select } from "antd";
import { useCartByCustomerId } from "../menu/useMenu";
import { RUPIAH } from "../../helper/helper";
import { useCreateTransaction } from "./usePembayaran";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Pembayaran = () => {
  const [isLoadingGetCart, dataCart, getCart] = useCartByCustomerId();
  const [createTransaction] = useCreateTransaction();
  const navigate = useNavigate();

  const [paymentType, setPaymentType] = useState("");

  const handleTransaction = () => {
    const body = {
      payment_type: paymentType,
    };

    console.log(body);

    createTransaction(body, () => {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please wait...",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/RincianPembayaran");
      }, 1500);
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
                <p className="identitas my-1 text-center">
                  Konfirmasi pembayaran
                </p>
              </div>
            </div>
          </div>

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
            <div className="container mt-4">
              <div className="row">
                <div className="col-12">
                  <Form layout="vertical">
                    <Form.Item
                      label="Nama Pemesan"
                      name={dataCart.Customer.name}
                      initialValue={dataCart.Customer.name}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input disabled />
                    </Form.Item>

                    <Form.Item
                      label="Nomor Telepon"
                      name="dataCart.Customer.phone_number"
                      initialValue={dataCart.Customer.phone_number}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item
                      label="Total Harga"
                      name={dataCart.total_price}
                      initialValue={RUPIAH(dataCart.total_price)}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        style={{ fontSize: 20, color: "#000000" }}
                        disabled
                      />
                    </Form.Item>

                    <Form.Item
                      label="Metode Pembayaran"
                      name={dataCart.payment_type}
                      rules={[
                        {
                          required: true,
                          message: "Haraus memilih metode pembayaran",
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        placeholder="Pilih Metode Pembayaran"
                        style={{
                          width: 250,
                        }}
                        onChange={(value) => setPaymentType(value)}
                        options={[
                          { value: "cash", label: "Cash" },
                          { value: "qris", label: "Qris" },
                        ]}
                      />
                      <Form.Item className="d-flex justify-content-center">
                        <Button
                          onClick={handleTransaction}
                          className="btPemesan my-4 px-5"
                          size="large"
                          shape="round"
                          htmlType="submit"
                          type="primary"
                          style={{ fontSize: "medium" }}
                        >
                          Bayar Sekarang
                        </Button>
                      </Form.Item>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </ConfigProvider>
        </>
      )}
    </>
  );
};
