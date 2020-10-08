import axios from "axios";

const getUser = (token) => {
    const userToken = token;
    const body = { token: userToken };
    axios.get(`http://localhost:5000/me/${body}`).then((res)=>{
            console.log('1135'+res)
        });
    
}
export default getUser;