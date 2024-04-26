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
