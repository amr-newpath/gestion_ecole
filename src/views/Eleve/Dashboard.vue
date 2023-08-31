<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <transition name="sidebar" mode="out-in">
      <aside
        v-if="isSidebarVisible"
        :class="{
          'w-16': isSidebarClosed,
          'w-64': !isSidebarClosed,
          'bg-blue-500': !isSidebarClosed,
          'bg-blue-700': isSidebarClosed
        }"
        class="overflow-hidden transition-all duration-300"
      >
        <div class="p-4 flex items-center justify-between">
          <h2
            class="text-white text-xl font-semibold"
            :class="{
              'hidden': isSidebarClosed
            }"
          >
            Eleve Dashboard
          </h2>
          <button
            @click="toggleSidebar"
            class="text-white focus:outline-none focus:text-white"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <nav
          :class="{
            'hidden': isSidebarClosed,
            'mt-6': !isSidebarClosed
          }"
        >
          <ul>
            <li class="px-6 py-2 text-white hover:bg-blue-600">
              <router-link to="/eleve/dashboard">Dashboard</router-link>
            </li>
            <li class="px-6 py-2 text-white hover:bg-blue-600">
              <router-link to="/eleve/profile">Profile</router-link>
            </li>
            <!-- Add more menu items as needed -->
          </ul>
        </nav>
        <button
          @click="logout"
          class="mt-auto block w-full text-white py-2 bg-red-500 hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          <svg
            class="w-6 h-6 inline-block mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          Logout
        </button>
      </aside>
    </transition>

    <!-- Main Content -->
    <main class="flex-1 p-10 overflow-x-hidden">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { useStore } from "vuex";
// import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: 'EleveDashboard',
  setup() {
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.dispatch("logout")
        .then(() => {
          router.push({ name: 'Login' });
        });
    }

    return {
      isSidebarClosed: false,
      isSidebarVisible: true,
      toggleSidebar() {
        this.isSidebarVisible = false;
        setTimeout(() => {
          this.isSidebarClosed = !this.isSidebarClosed;
          this.isSidebarVisible = true;
        }, 300); // Adjust the duration as needed
      },
      logout
    };
  }
  // Add any additional configuration or logic as needed
};
</script>

<style>
/* Add custom styling for the sidebar and other elements */
/* ... rest of the styles ... */

/* Sidebar transition */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: width 0.3s, background-color 0.3s, opacity 0.3s;
}
.sidebar-enter,
.sidebar-leave-to {
  width: 16px;
  opacity: 0;
  background-color: transparent;
}
</style>
