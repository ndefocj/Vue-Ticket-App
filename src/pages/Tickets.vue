<template>
  <div>
    <div class="page-header">
      <div class="container">
        <h1>Manage Tickets</h1>
        <button @click="handleOpenCreateModal" class="btn btn-primary">
          Create New Ticket
        </button>
      </div>
    </div>

    <div class="container">
      <p v-if="loading">Loading tickets...</p>
      <div v-else class="ticket-list">
        <TicketCard
          v-for="ticket in tickets"
          :key="ticket.id"
          :ticket="ticket"
          @edit="handleOpenEditModal"
          @delete="handleDeleteTicket"
        />
      </div>
    </div>

    <TicketFormModal
      v-if="isModalOpen"
      :ticket="currentTicket"
      @close="handleCloseModal"
      @save="handleSaveTicket"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import TicketCard from "../components/TicketCard.vue";
import TicketFormModal from "../components/TicketFormModal.vue";

const tickets = ref([]);
const isModalOpen = ref(false);
const currentTicket = ref(null); 
const loading = ref(true);
const toast = useToast();

const fetchTickets = async () => {
  loading.value = true;
  try {
    const response = await fetch("https://hng-ticket-api-kam7.vercel.app/api/tickets");
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    tickets.value = data;
  } catch (error) {
    console.error("Failed to load tickets:", error);
    toast.error("Failed to load tickets.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTickets);

const handleOpenCreateModal = () => {
  currentTicket.value = null;
  isModalOpen.value = true;
};
const handleOpenEditModal = (ticket) => {
  currentTicket.value = ticket;
  isModalOpen.value = true;
};
const handleCloseModal = () => {
  isModalOpen.value = false;
  currentTicket.value = null;
};

const handleSaveTicket = async (ticketData) => {
  const isEditing = !!currentTicket.value;
  const url = isEditing
    ? `https://hng-ticket-api-kam7.vercel.app/api/tickets/${currentTicket.value.id}`
    : "https://hng-ticket-api-kam7.vercel.app/api/tickets";
  const method = isEditing ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData),
    });
    if (!response.ok) throw new Error("Failed to save ticket");

    toast.success(`Ticket ${isEditing ? "updated" : "created"} successfully!`);
    fetchTickets();
    handleCloseModal();
  } catch (error) {
    console.error("Failed to save ticket:", error);
    toast.error("Failed to save ticket.");
  }
};

const handleDeleteTicket = async (ticketId) => {
  if (!window.confirm("Are you sure you want to delete this ticket?")) return;

  try {
    const response = await fetch(
      `https://hng-ticket-api-kam7.vercel.app/api/tickets/${ticketId}`,
      { method: "DELETE" }
    );
    if (!response.ok) throw new Error("Failed to delete ticket");

    toast.success("Ticket deleted successfully!");
    fetchTickets();
  } catch (error) {
    console.error("Failed to delete ticket:", error);
    toast.error("Failed to delete ticket.");
  }
};
</script>
