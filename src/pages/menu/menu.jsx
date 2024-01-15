import React, { useEffect, useState } from "react";
import { CategoryMenu } from "./category";
import {
  ConfigProvider,
  Card,
  Switch,
  Select,
  Modal,
  Image,
  Input,
  Button,
  Space,
  FloatButton,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Images } from "./images";
import Swal from "sweetalert2";
import {
  useMenu,
  useAddMenuToCart,
  useCategoryMenuById,
  useCategoryMenu,
  useMenuById,
  useCartByCustomerId,
} from "./useMenu";
import { LoadingComponent } from "../../component/loading";
import { RUPIAH } from "../../helper/helper";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Makanan");
  const [isLoadingDataMenu, dataMenu, getAllMenu] = useMenu(selectedCategory);
  const [isLoadingDataMenuById, dataMenuById, getMenuById] = useMenuById();
  const [isLoadingCategoryMenuId, categoryMenuID, getCategoryMenuById] =
    useCategoryMenuById();
  const [isLoadingCategoryMenu, categoryMenu, getCategoryMenu] =
    useCategoryMenu();
  const [isLoadingGetCart, dataCart, getCart] = useCartByCustomerId();
  const [addMenuToCart] = useAddMenuToCart();

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [takeAway, setTakeAway] = useState(false);
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const { Meta } = Card;
  const { TextArea } = Input;

  const handleAddMenuToCart = (id) => {
    const body = {
      menu_id: id,
      quantity: quantity,
      take_away: takeAway,
      note: note,
    };

    addMenuToCart(body, () => {
      getAllMenu();
      setOpen(false);
      getCart();
    });
  };

  const handleGetMenuById = (id) => {
    getMenuById(id);
    setOpen(true);
  };

  const handleSelectCategory = (value) => {
    setSelectedCategory(value);
    getCategoryMenuById(value);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onChangeSwitch = (checked) => {
    setTakeAway(checked);
    console.log(`switch to ${checked}`);
  };

  const onNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleCart = () => {
    navigate("/keranjang");
  };

  useEffect(() => {
    getAllMenu(selectedCategory);
    getCategoryMenu();
    getCart();
  }, [selectedCategory]);

  return (
    <>
      {isLoadingDataMenu && isLoadingDataMenu ? <LoadingComponent /> : null}
      <ConfigProvider
        theme={{
          components: {
            Select: {
              optionSelectedColor: "#FFFFFF",
              optionSelectedBg: "#E41C1F",
              colorPrimaryBorder: "#E41C1F",
              colorPrimaryHover: "#E41C1F",
            },
          },
        }}
      >
        <>
          <div className="container d-flex justify-content-center">
            <div className="row">
              <div className="col-12 py-3">
                <Select
                  size="large"
                  defaultValue="Makanan"
                  style={{
                    width: 250,
                  }}
                  value={selectedCategory}
                  onChange={handleSelectCategory}
                  options={
                    categoryMenu &&
                    categoryMenu.map((data) => ({
                      value: data.ID,
                      label: data.name,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </>
      </ConfigProvider>
      <Images />
      {selectedCategory !== "Makanan" && categoryMenuID && (
        <div className="container d-flex justify-content-center">
          <div className="row">
            {categoryMenuID &&
              categoryMenuID.Menu.map((data) => (
                <div
                  className="container d-flex justify-content-center"
                  key={data.ID}
                >
                  <div className="row">
                    <div className="col-5 py-2">
                      <Card
                        className="cardMenu"
                        style={{ width: 360, height: 110 }}
                        onClick={() => handleGetMenuById(data.ID)}
                      >
                        <Meta
                          avatar={
                            <img
                              className="imgMenu"
                              style={{ width: 80, height: 75 }}
                              alt="..."
                              src={data.image_url}
                            />
                          }
                          title={data.name}
                          description={
                            <p className="hargaMenu">{RUPIAH(data.price)}</p>
                          }
                        />
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            {/* <p className="text-center" style={{ paddingBottom: 200 }}>
              All items are already view
            </p> */}
          </div>
        </div>
      )}

      {selectedCategory === "Makanan" &&
        dataMenu &&
        dataMenu.map((data) => (
          <div
            className="container d-flex justify-content-center"
            key={data.ID}
          >
            <div className="row">
              <div className="col-5 py-2">
                <Card
                  className="cardMenu"
                  style={{ width: 360, height: 110 }}
                  onClick={() => handleGetMenuById(data.ID)}
                >
                  <Meta
                    avatar={
                      <img
                        className="imgMenu"
                        style={{ width: 80, height: 75 }}
                        alt="..."
                        src={data.image_url}
                      />
                    }
                    title={data.name}
                    description={
                      <p className="hargaMenu">{RUPIAH(data.price)}</p>
                    }
                  />
                </Card>
              </div>
            </div>
          </div>
        ))}

      {dataMenuById && (
        <Modal
          open={open}
          okText={
            <>
              <div className="container d-flex justify-content-center">
                <div className="row">
                  <div className="col-9">Masuk keranjang</div>
                  <div className="col-1">
                    <ShoppingCartOutlined
                      style={{ fontSize: "25px", color: "#FFFFFF" }}
                    />
                  </div>
                </div>
              </div>
            </>
          }
          onOk={() => {
            handleAddMenuToCart(dataMenuById.ID);
            getCart();
          }}
          onCancel={() => setOpen(false)}
        >
          <br />
          <br />
          <div className="container d-flex justify-content-center">
            <div className="row">
              <div className="col-12">
                <Image
                  preview={false}
                  className="imgModal"
                  width={150}
                  src={dataMenuById.image_url}
                />
              </div>
            </div>
          </div>
          <div className="container d-flex justify-content-center">
            <div className="row">
              <div className="col-12 py-3">
                <h6 className="namaMenuModal py-2">{dataMenuById.name}</h6>
                <h6 className="hargaMenuModal">{RUPIAH(dataMenuById.price)}</h6>
                <div className="d-flex justify-content-center py-2">
                  <Button onClick={handleDecrement} icon="-" />
                  <Input
                    className="quantityModal mx-2"
                    min={1}
                    step={1}
                    onChange={(value) => handleQuantityChange(value)}
                    value={quantity}
                  />
                  <Button onClick={handleIncrement} icon="+" />
                </div>
                <div className="d-flex justify-content-center pt-4">
                  <Space direction="vertical">
                    <Switch onChange={onChangeSwitch} />
                  </Space>
                  <h5 className="bungkusTag " style={{ paddingLeft: 10 }}>
                    Bungkus
                  </h5>
                </div>
                <div className="d-flex justify-content-center pt-4">
                  <TextArea
                    showCount
                    maxLength={100}
                    onChange={onNoteChange}
                    placeholder="Tulis catatan disini"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {dataCart && (
        <ConfigProvider
          theme={{
            token: {
              colorBgElevated: "#E31A1D",
              colorText: "#FFFFFF",
            },
          }}
        >
          <>
            <div className="container d-flex justify-content-center">
              <div className="row">
                <FloatButton
                  shape="square"
                  style={{
                    width: 350,
                    height: 60,
                    left: "50%",
                    transform: "translateX(-50%)",
                    bottom: 100,
                  }}
                  description={
                    <div className="container textKeranjang">
                      <div className="row">
                        <div className="col-9 membayar">
                          {dataCart.total_item} Barang |{" "}
                          {RUPIAH(dataCart.total_price)}
                        </div>
                        <div className="col-1"></div>
                        <div className="col-1 keranjang">
                          <ShoppingCartOutlined
                            style={{ fontSize: "40px", color: "#FFFFFF" }}
                          />
                        </div>
                      </div>
                    </div>
                  }
                  onClick={handleCart}
                />
              </div>
            </div>
          </>
        </ConfigProvider>
      )}
    </>
  );
};
