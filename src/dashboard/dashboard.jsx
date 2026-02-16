import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ImageCreate } from "../slice";

const Dashboard = () => {

    const dispatch = useDispatch();

    const [prompt,setprompt] = useState("");

    const handleImageGenerater = async() => {
        const imageAction = await dispatch(ImageCreate(prompt));

        if(ImageCreate.fulfilled.match(imageAction)){
            const res = imageAction.payload;

            console.log(res);
        }
    }

    return(
        <div>
            <div className="">
                <input type="text" onChange={(e)=>setprompt(e.target.value)} />
                <button onClick={handleImageGenerater}>Create</button>
            </div>
        </div>
    )
}

export default Dashboard;