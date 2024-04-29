const baseUrl = "http://192.168.10.126:8080";

export const apiList = {
  createTicket: `${baseUrl}/api/addNew`,
  getAllTicketList: `${baseUrl}/api/allTickets`,
  getTicketByTicketId: `${baseUrl}/api/ticketDetails`,
  submitTicketApproval: `${baseUrl}/api/updateTicket`,
  getAllUsers: `${baseUrl}/api/users`,
};
