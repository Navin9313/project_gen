import React, { use, useState } from "react";
import { useDispatch } from "react-redux";
import { interviewInsert } from '../slice'

const CRUD = () => {

    const dispatch = useDispatch();

    const [ProductData,setProductData] = useState({
        product: "",
        price: "",
        stock: null
    })

    const [selectData,setselectData] = useState({
        page: 0,
        limit: 3,
        data: [],
        totalpage: 1
    })

    const handleData = (e) => {
        const { name, value, type, checked } = e.target;

        setProductData({
            ...ProductData,
            [name] : type === "checkbox" ? checked : value
        })
    }

    const handleInsert = async() => {
        const InsertAction = await dispatch(interviewInsert(ProductData))

        if(interviewInsert.fulfilled.match(InsertAction)){
            const res = InsertAction.payload;

            console.log(res);
        }
    }

    return(
        <div>
            <div className="grid grid-cols-2 gap-[30px]">
                <div className="bg-white shadow-2xl rounded-md p-[30px]">
                    <div className="grid grid-cols-1 gap-[20px]">
                        <div className="flex flex-col gap-[12px]">
                            <label htmlFor="" className="flex justify-start text-[20px]">Product</label>
                            <input type="text" placeholder="Enter Product" className="w-[100%] h-[35px] border-blue-400 shadow-sm rounded-md outline-3 outline-offset-2 outline-double outline-blue-800 pl-[5px]" name="product" value={ProductData.product} onChange={handleData} />
                        </div>
                        <div className="flex flex-col gap-[12px]">
                            <label htmlFor="" className="flex justify-start text-[20px]">Price</label>
                            <input type="text" placeholder="Enter Price" className="w-[100%] h-[35px] border-blue-400 shadow-sm rounded-md outline-3 outline-offset-2 outline-double outline-blue-700 pl-[5px]" name="price" value={ProductData.price} onChange={handleData}/>
                        </div>
                        <div className="flex flex-col gap-[12px] items-start">
                            <label htmlFor="" className="flex justify-start text-[20px]">Stock</label>
                            <input type="checkbox" className="w-[16px] h-[16px] rounded-md outline-2 outline-blue-700" name="stock" value={ProductData.stock} onChange={handleData}/>
                        </div>
                        <div className="flex flex-col">
                            <button className="w-[200px] h-[35px] rounded-md shadow-lg bg-blue-400 text-white font-black" onClick={handleInsert}>Submit</button>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-2xl rounded-md p-[30px] overflow-x-auto flex flex-col">
                    <table className="w-full border border-gray-300 border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2 text-left">Id</th>
                                <th className="border px-4 py-2 text-left">Product Name</th>
                                <th className="border px-4 py-2 text-left">Price</th>
                                <th className="border px-4 py-2 text-left">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">1</td>
                                <td className="border px-4 py-2">I Phone</td>
                                <td className="border px-4 py-2">150000</td>
                                <td className="border px-4 py-2">True</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CRUD;