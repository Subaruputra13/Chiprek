import currency from "currency.js";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

//currency format
export const RUPIAH = (value) => {
  return currency(value, {
    symbol: "Rp ",
    decimal: ",",
    separator: ".",
    precision: 0,
    formatWithSymbol: true,
  }).format();
};

//day js
export const FORMAT_DATETIME = (date) => {
  return dayjs(date).format("DD MMMM YYYY - HH:mm:ss");
};

export const FORMAT_DATE = (date) => {
  return dayjs(date).locale("id").format("DD MMMM YYYY");
};
