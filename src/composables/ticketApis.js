import { ref } from "vue";
import axios from "axios";
import { apiList } from "@/utils/constants";

export async function createTicket(payload) {
  try {
    const res = await axios.post(`${apiList.createTicket}`, payload);
    // console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
}

export async function getAllTicket(payload) {
  try {
    const res = await axios.post(`${apiList.getAllTicketList}`, payload);
    // console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
}

export async function getTicketByTicketId(payload) {
  try {
    const res = await axios.post(`${apiList.getTicketByTicketId}`, payload);
    // console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
}

export async function submitTicketApproval(payload) {
  try {
    const res = await axios.post(`${apiList.submitTicketApproval}`, payload);
    // console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
}

export async function getAllUsers() {
  try {
    const res = await axios.get(`${apiList.getAllUsers}`);
    // console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
}

export async function getUserById(id) {
  try {
    const res = await axios.get(`${apiList.getUserById}/${id}`);
    // console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
}

export async function getAllAssets() {
  try {
    const res = await axios.get(`${apiList.getAllAssets}`);
    // console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
}

export async function getAllUnallocatedAssets() {
  try {
    const res = await axios.get(`${apiList.getAllUnallocatedAssets}`);
    // console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
}

export async function bulkAllocateAsset(payload) {
  try {
    const res = await axios.post(`${apiList.bulkAllocateAsset}`, payload);
    // console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
}

export async function allocateAssetbyId(payload) {
  try {
    const res = await axios.post(`${apiList.allocateAssetbyId}`, payload);
    // console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
}
