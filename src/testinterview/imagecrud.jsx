import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productimageInsert, productimageShow, productimageUpdate } from "../slice";

const ImageCrud = () => {

    const dispatch = useDispatch();
    const { interview, isloading, iserror } = useSelector((state)=>state.user);
    console.log(interview, isloading, iserror);

    const [data,setdata] = useState({
        name: "",
        image: null,
        description: ""
    })
    const [editId, seteditId] = useState(null);
    const [previewImage, setpreviewImage] = useState(null);

    const handleData = (e) => {
        const { name, value, type, files } = e.target;
        
        setdata({
            ...data,
            [name] : type === "file" ? files[0] : value
        })

        setpreviewImage(URL.createObjectURL(e.target.files[0]));
    }

    const addImage = async() => {
        const formdata = new FormData();

        formdata.append('name', data.name);
        formdata.append('description', data.description);
        
        if(data.image){
            formdata.append('image', data.image);
        }

        const addAction = await dispatch(productimageInsert(formdata));

        if(productimageInsert.fulfilled.match(addAction)){
            const res = addAction.payload;
            showImage();
            // console.log(res);
        }
    }

    const showImage = async() => {
        const getAction = await dispatch(productimageShow());

        if(productimageShow.fulfilled.match(getAction)){
            const res = getAction.payload;

            // console.log(res);
        }
    }

    useEffect(()=>{
        showImage();
    },[]);


    const handleEdit = (val) => {
        seteditId(val.id);
        setdata({
            name: val.product_name,
            image: null,
            description: val.description
        })
        setpreviewImage(`http://localhost:9000/uploads/${val.image}`);
    }

    const handleUpdate = async() => {

        const formdata = new FormData();
        formdata.append("id", editId);
        formdata.append("name", data.name);
        formdata.append("description", data.description);

        if(data.image){
            formdata.append("image", data.image);
        }

        const editAction = await dispatch(productimageUpdate(formdata));

        if(productimageUpdate.fulfilled.match(editAction)){
            const res = editAction.payload;
            showImage();
            // console.log(res);
        }

        setdata({
            name: "",
            image: null,
            description: ""
        });

        setpreviewImage(null);
        seteditId(null);
    }

    return(
        <div className="row p-7 ">
            <div className="col-lg-6 p-6">
                <div className="card shadow">
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="" className="form-label">Product Name</label>
                            <input type="text" className="form-control" name="name" value={data.name} onChange={handleData} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <label htmlFor="" className="form-label">Upload Image</label>
                            <input type="file" className="form-control" name="image" onChange={handleData} />
                            {
                                previewImage ? (
                                    <img src={previewImage} style={{
                                        height: "70px",
                                        width: "70px",
                                        marginTop: "10px"
                                    }} alt="previewImage" />
                                ) : (
                                    <p>Upload Image</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <label htmlFor="" className="form-label">Description</label>
                            <textarea name="description" value={data.description} onChange={handleData} id="" className="form-control" cols="30" rows="15"></textarea>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <button className="btn btn-danger w-100" onClick={addImage}>Submit</button>
                    </div>
                    <div className="row mt-3">
                        <button className="btn btn-primary w-100" onClick={handleUpdate}>Edit</button>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <table className="table table-hover">
                    <thead className="text-center">
                        <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            isloading ? (
                                <>
                                    {[1,2,3,4].map((item)=>(
                                        <tr key={item}>
                                            <td><div className="skeleton" style={{height:"20px"}}></div></td>
                                            <td><div className="skeleton" style={{height:"20px"}}></div></td>
                                            <td><div className="skeleton" style={{height:"60px", width:"90px"}}></div></td>
                                            <td><div className="skeleton" style={{height:"20px"}}></div></td>
                                            <td><div className="skeleton" style={{height:"30px"}}></div></td>
                                            <td><div className="skeleton" style={{height:"30px"}}></div></td>
                                        </tr>
                                    ))}
                                </>
                            ) : (

                                interview?.output?.map((val)=>(
                                    <tr>
                                        <td>{val.id}</td>
                                        <td>{val.product_name}</td>
                                        <td>
                                            {/* <img src="https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pink_PDP_Image_Position-1__en-IN.jpg?v=1759733974&width=823" style={{height: "70px", width: "70px", display:"flex",alignItems:"center",justifyContent:"center"}} alt="product" /> */}
                                            <img src={`http://localhost:9000/uploads/${val.image}`} style={{height: "60px", width: "90px", display:"flex",alignItems:"center",justifyContent:"center"}} alt="product" />
                                        </td>
                                        <td>{val.description.slice(0,13)} ....</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary btn-sm" onClick={()=>handleEdit(val)}>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ImageCrud;