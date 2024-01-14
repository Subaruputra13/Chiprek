import React, { useEffect } from "react";
import { CategoryMenu } from "./category";
import { ConfigProvider, Card, Avatar } from "antd";
import { Images } from "./images";
import Swal from "sweetalert2";
import { useMenu, useAddMenuToCart } from "./useMenu";
import { LoadingComponent } from "../../component/loading";
import { RUPIAH } from "../../helper/helper";

export const Menu = () => {
  const [isLoading, dataMenu, getAllMenu] = useMenu();
  const [addMenuToCart] = useAddMenuToCart();

  const { Meta } = Card;

  const handleAddMenuToCart = (id) => {
    const body = {
      menu_id: id,
      quantity: e.quantity,
      take_away: e.take_away,
      note: e.note,
    };

    addMenuToCart(body, () => {
      getAllMenu();
    });
  };

  useEffect(() => {
    getAllMenu();
  }, []);

  return (
    <>
      {isLoading && isLoading ? <LoadingComponent /> : null}
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
        <CategoryMenu />
      </ConfigProvider>
      <Images />
      {dataMenu &&
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
                  onClick={() => Swal.fire({ title: "hello world" })}
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
    </>
  );
};
