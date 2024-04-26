<script setup>
import { getAllTicket } from "@/composables/ticketApis";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import userData from "../mockData/userDetails.json";

let router = useRouter();

const heading = "Tickets List";
const isLoading = ref(false);
const ticketList = ref(null);
const error = ref(null);

async function fetchData() {
  const payload = {
    userId: userData.userId,
  };
  isLoading.value = true;
  try {
    const getAllTicketRes = await getAllTicket(payload); // Pass any required payload
    console.log("getAllTicketRes", getAllTicketRes);
    if (getAllTicketRes.data.success) {
      ticketList.value = getAllTicketRes.data.data;
    } else {
      error.value =
        getAllTicketRes.data.message ||
        getAllTicketRes.data.error ||
        "Something went wrong, Please try again later";
    }
  } catch (error) {
    error.value = error.message || "Error fetching ticket data";
  } finally {
    isLoading.value = false;
  }
}

fetchData(); // Call fetchData when component is mounted

function viewDetails(ticketId) {
  router.push({ name: "ticket-details", params: { id: ticketId } });
}
</script>

<template>
  <div v-if="isLoading">
    <div class="d-flex justify-content-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div v-else-if="error">{{ error }}</div>

  <div v-else>
    <div class="container-xxl">
      <div class="mb-5 text-center">
        <h1>{{ heading }}</h1>
      </div>
      <table class="table table-striped text-center border">
        <thead class="border-bottom border-black">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Severity</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in ticketList" :key="ticket.id">
            <td>{{ ticket.id }}</td>
            <td>{{ ticket.title }}</td>
            <td>{{ ticket.category }}</td>
            <td>{{ ticket.severity }}</td>
            <td>{{ ticket.status }}</td>

            <td>
              <button class="btn btn-primary" @click="viewDetails(ticket.id)">
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
