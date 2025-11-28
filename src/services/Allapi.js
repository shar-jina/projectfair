import commonAPI from "./commonAPI";
import SERVER_URL from "./serverurl";

//register api
export const registerAPI=async(reqbody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqbody,)



}
//login api
export const loginAPI=async(reqbody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqbody)



}
//addproject api
export const addprojectAPI=async(reqbody,reqheader)=>{
    return await commonAPI("POST",`${SERVER_URL}/addproject`,reqbody,reqheader)

}

//get projectdetails
export const gethomeprojectAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/gethomeproject`,{})



}
//get all project
export const getallprojectAPI=async(projectname,reqheader)=>{
    return await commonAPI("GET",`${SERVER_URL}/getallproject?search=${projectname}`,{},reqheader)



}
//get user project
export const getuserprojectAPI=async(reqheader)=>{
    return await commonAPI("GET",`${SERVER_URL}/getuserproject`,{},reqheader)



}
//update project
export const updateprojectAPI=async(pid,reqheader,reqbody)=>{
    return await commonAPI("PUT",`${SERVER_URL}/updateproject/${pid}`,reqheader,reqbody)



}
//delete project
export const deleteprojectAPI=async(pid,reqheader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/deleteproject/${pid}`,{},reqheader)



}
//update profile
export const updateprofileAPI=async(reqheader,reqbody)=>{
    return await commonAPI("PUT",`${SERVER_URL}/updateprofile/`,reqheader,reqbody)



}

