<template>
  <div>
    <div class="circle circle-1"></div>

    <section class="hero">
      <div class="hero-content container">
        <h1>Manage Your Support Tickets Seamlessly</h1>
        <p>
          The all-in-one solution for tracking, managing, and resolving customer
          support tickets across multiple frameworks.
        </p>
        <div class="hero-actions">
          <RouterLink to="/auth" class="btn btn-primary btn-lg"
            >Get Started Now</RouterLink
          >
          <RouterLink to="/auth" class="btn btn-secondary btn-lg"
            >Login</RouterLink
          >
        </div>
      </div>
      <div class="hero-wave">
        <img
          src="/wave-hero.svg"
          alt="wavy background"
          style="width: 100%; display: block"
        />
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>Why Choose TicketApp?</h2>
        <div class="features-grid">
          <div class="card-box">
            <h3>Multi-Framework</h3>
            <p>
              Built in React, Vue, and Twig to demonstrate full mastery of modern
              web technologies.
            </p>
          </div>
          <div class="card-box">
            <h3>Full CRUD</h3>
            <p>
              Create, Read, Update, and Delete tickets with a seamless,
              validated user interface.
            </p>
          </div>
          <div class="card-box">
            <h3>Secure Auth</h3>
            <p>
              Protected routes and session management keep your data safe and
              secure.
            </p>
          </div>
        </div>
        <div class="circle circle-2"></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
