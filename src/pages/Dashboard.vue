<template>
  <div>
    <div class="page-header">
      <div class="container">
        <h1>Dashboard</h1>
        <RouterLink to="/tickets" class="btn btn-primary"
          >Go to Tickets</RouterLink
        >
      </div>
    </div>

    <div class="container">
      <div class="stats-grid">
        <div class="card-box stat-card">
          <h3>Total Tickets</h3>
          <p class="stat-number">{{ stats.total }}</p>
        </div>
        <div class="card-box stat-card">
          <h3>Open Tickets</h3>
          <p class="stat-number">{{ stats.open }}</p>
        </div>
        <div class="card-box stat-card">
          <h3>Resolved Tickets</h3>
          <p class="stat-number">{{ stats.resolved }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useToast } from "vue-toastification";

const stats = ref({ total: 0, open: 0, resolved: 0 });
const toast = useToast();

const fetchStats = async () => {
  try {
    const response = await fetch("https://hng-ticket-api-kam7.vercel.app/api/tickets");
    if (!response.ok) throw new Error("Failed to fetch tickets");
    const tickets = await response.json();

    stats.value = {
      total: tickets.length,
      open: tickets.filter((t) => t.status === "open").length,
      resolved: tickets.filter((t) => t.status === "closed").length,
    };
  } catch (error) {
    console.error("Failed to load dashboard stats:", error);
    toast.error("Failed to load dashboard stats.");
  }
};

onMounted(fetchStats);
</script>
