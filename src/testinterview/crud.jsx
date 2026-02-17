import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { interviewInsert, productdataFetch, productEdit, productRemove } from '../slice'

const CRUD = () => {

    const dispatch = useDispatch();

    const [ProductData,setProductData] = useState({
        product: "",
        price: "",
        stock: null
    })
    const [selectData,setselectData] = useState({
        page: 1,
        limit: 3,
        data: [],
        totalpage: 1
    })
    const [editid,seteditid] = useState(null);

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

            // console.log(res);
        }
    }

    const handlegetdata = async() => {
        const getAction = await dispatch(productdataFetch(
            selectData
        ));

        if(productdataFetch.fulfilled.match(getAction)){
            const res = getAction.payload;

            // console.log(res);

            setselectData((pre) => ({
                ...pre,
                data: res.data,
                totalpage: res.totalpage
            }));
        }
    }

    useEffect(()=>{
        handlegetdata();
    },[selectData.page]);

    
    const handleIncrement = () => {
        if(selectData.page < selectData.totalpage){
            setselectData((pre) => ({
                ...pre, page: pre.page + 1
            }))
        }
    }
    
    const handleDecrement = () => {
        if(selectData.page > 1){
            setselectData((pre) => ({
                ...pre, page: pre.page - 1
            }))
        }
    }
    
    const getEditData = (values) => {
        setProductData({
            product: values.product,
            price: values.price,
            stock: values.stock == 1 ? true : false
        })
        seteditid(values.id);
    }
    
    const updateProduct = async() => {
        const editAction = await dispatch(productEdit({ProductData,editid}));

        if(productEdit.fulfilled.match(editAction)){
            const res = editAction.payload;

            handlegetdata();
            // console.log(res);
        }
    }

    const removeData = async(id) => {
        const removeAction = await dispatch(productRemove(id));

        if(productRemove.fulfilled.match(removeAction)){
            const res = removeAction.payload;

            handlegetdata();
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
                            <input type="checkbox" className="w-[16px] h-[16px] rounded-md outline-2 outline-blue-700" name="stock" checked={ProductData.stock} onChange={handleData}/>
                        </div>
                        <div className="flex flex-col">
                            <button className="w-[200px] h-[35px] rounded-md shadow-lg bg-blue-400 text-white font-black" onClick={handleInsert}>Submit</button>
                        </div>
                        <div className="flex flex-col">
                            <button className="w-[200px] h-[35px] rounded-md shadow-lg bg-blue-500 text-white font-black" onClick={updateProduct}>Edit</button>
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
                                <th className="border px-4 py-2 text-left">Edit</th>
                                <th className="border px-4 py-2 text-left">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectData.data.map((val)=>(
                                    <tr>
                                        <td className="border px-4 py-2">{val.id}</td>
                                        <td className="border px-4 py-2">{val.product}</td>
                                        <td className="border px-4 py-2">{val.price}</td>
                                        <td className="border px-4 py-2">{val.stock == 1 ? "Yes" : "No"}</td>
                                        <td className="border px-4 py-2">
                                            <button className="w-[70px] h-[30px] bg-blue-400 text-white shadow-2xl rounded-md font-mono" onClick={()=>getEditData(val)}>Change</button>
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button className="w-[70px] h-[30px] bg-red-400 text-white shadow-2xl rounded-md font-sans" onClick={()=>removeData(val.id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))
                            }
                            {/* <tr>
                                <td className="border px-4 py-2">1</td>
                                <td className="border px-4 py-2">I Phone</td>
                                <td className="border px-4 py-2">150000</td>
                                <td className="border px-4 py-2">True</td>
                            </tr> */}
                        </tbody>
                    </table>
                    
                    
                    <div class="flex justify-center mt-6 space-x-1">
                        <button class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100" onClick={handleDecrement}>
                            Previous
                        </button>
                        {/* <button class="px-4 py-2 text-sm border rounded-lg bg-indigo-500 text-white">
                            1
                        </button> */}
                        {/* <button class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100">
                            2
                        </button>
                        <button class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100">
                            3
                        </button> */}
                        <button class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100" onClick={handleIncrement}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CRUD;