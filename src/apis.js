import axios from 'axios';


export  const apis=async ()=> {


    const accessToken=localStorage.getItem('authToken')
try{
    const response= await axios.get('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/dashboard',{

    headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

}
catch(error){
    console.log(error)
}


}

export default apis;