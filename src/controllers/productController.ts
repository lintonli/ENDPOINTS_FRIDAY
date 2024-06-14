import { Request, Response, RequestHandler } from "express";
import { sqlConfig } from "../config";
import mssql from "mssql";
import { v4 as uid } from "uuid";
import sql from 'mssql'
import { IProduct, ProductRequest } from "../Models/product";

export const addProduct = async (req: ProductRequest, res: Response) => {
  try {
    const id = uid();
    const { PNAME, PRICE } = req.body;

    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("ID", id)
      .input("PNAME", PNAME)
      .input("PRICE", PRICE)
      .execute("addProduct2");

    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const products = (await pool.request().execute("getProducts"))
      .recordset as IProduct[];
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getProductName = async (
  req: Request<{ id: String }>,
  res: Response
) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const product = (
      await pool.request().input("ID", req.params.id).execute("getProductBYid")
    ).recordset[0] as IProduct;
    if (product && product.ID) {
      return res.status(200).json(product);
    }

    return res.status(400).json({ message: "Product not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getPaginatedProducts= async(req:Request, res:Response)=>{
    const page = parseInt(req.query.page as string)||1
    const limit = parseInt(req.query.limit as string) || 5;
    const offset = (page-1)*limit;

    try {
        const pool = await mssql.connect(sqlConfig)
        const result = (await pool
          .request()
          .input("Offset", offset)
          .input("Limit", limit)
          .execute("GetPaginatedProducts")).recordset as IProduct[];

return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const deleteProduct = async(req:Request<{id:string}>, res:Response)=>{
    const pool = await mssql.connect(sqlConfig)
    const prod = (await pool.request()
    .input("ID", req.params.id)
    .execute('getProductBYid')).recordset[0] as IProduct;

    if(prod && prod.ID){
        await pool.request()
        .input("ID", req.params.id)
        .execute('deleteProduct')
        return res.status(200).json({message:"Product deleted successfully"})
    }
    return res.status(404).json({message:"Product not found"})
}