import { Request } from "express";
export interface IProduct {
  ID: string;
  PNAME: String;
  PRICE: String;
}
interface addProduct {
  PNAME: String;
  PRICE: String;
}
export interface ProductRequest extends Request {
  body: addProduct;
}
