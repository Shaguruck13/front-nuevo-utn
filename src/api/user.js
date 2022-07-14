import axios from 'axios';


export const getAllUsers = async () => {
    try {
        const res = await axios.get("/users");
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getUserByIdReq = async (id) => {
    try {
        const res = await axios.get(`/users/${id}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getUserByEmailReq = async (email) => {
    try {
        const res = await axios.get(`/users/${email}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const registerReq = async (body) => {
    try {
        const form = new FormData();

        for (let key in body) {
            form.append(key, body[key]);
        }

            const res = await axios.post("/users/registers", form, {
                headers: {
                    "content-Type": "multipart/form-data",
                }
            })

            return res.data
        } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

export const deleteUserReq = async (id) => {
    try {
        const res = await axios.delete(`/users/${id}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const updateUserReq = async (id, body) => {
    try {
            const form = new FormData();

            for (let key in body) {
                form.append(key, body[key]);
            }
    
            const res = await axios.patch(`/users/${id}`, form, {
                headers: {
                    "content-Type": "multipart/form-data",
                }
            })
            return res.data

    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }





//esto anda
/*     try {
        const res = await axios.patch(`/users/${id}`, body)
        return res.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    } */
}