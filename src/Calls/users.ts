import { axiosInstance } from ".";

async function registerUser(data){

    try{
        const response=await axiosInstance.post("",{
            "name":data.name,
            "Email":data.email,
            "password":data.password
        });
        return response.data;
    }catch(err){
        return err;
    }
}

async function loginUser(data){

    console.log(data);

    try{
        const response=await axiosInstance.post("",{
            "email":data.email,
            "password":data.password
        });
        return response.data;
    }catch(err){
        return err;
    }
}


export {registerUser,loginUser};
