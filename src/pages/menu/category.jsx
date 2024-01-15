import React, { useEffect } from "react";
import { Select } from "antd";
import { useCategoryMenuById, useCategoryMenu } from "./useMenu";

export const CategoryMenu = ({ selectedCategory, onSelectCategory }) => {
  const [isLoadingCategoryMenuId, categoryMenuID, getCategoryMenuById] =
    useCategoryMenuById();
  const [isLoadingCategoryMenu, categoryMenu, getCategoryMenu] =
    useCategoryMenu();

  useEffect(() => {}, [categoryMenu]);
  return (
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
              onSelect={onSelectCategory}
              options={
                categoryMenu &&
                categoryMenu.map((data) => ({
                  value: data.id,
                  label: data.name,
                }))
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
