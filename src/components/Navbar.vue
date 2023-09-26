<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useFullscreen } from "@vueuse/core";
import { Icon } from "@iconify/vue";
import {
  handleScroll,
  isDark,
  scrolling,
  toggleDarkMode,
  sidebarState,
} from "@/composables";
import Button from "@/components/Button.vue";
import Logo from "@/components/Logo.vue";
import Dropdown from "@/components/Dropdown.vue";
import DropdownLink from "@/components/DropdownLink.vue";
import userAvatar from "@/assets/images/avatar.png";

const userName = sessionStorage.getItem("userName");
const userRole = sessionStorage.getItem("userRole");

const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();

onMounted(async () => {
  document.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  document.removeEventListener("scroll", handleScroll);
});

import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import axiosClient from "@/axios";
import { formatDistanceToNow } from "date-fns";

const $toast = useToast();

const isVisible = ref(false);
const notifications = ref([]);
const unreadNotifications = ref(false);

async function fetchNotifications() {
  try {
    const response = await axiosClient("/notifications");
    notifications.value = response.data;

    unreadNotifications.value = notifications.value.some(
      (notification) => !notification.read_at
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
}

async function markNotificationsAsRead() {
  try {
    await axiosClient.post("/notifications/mark-as-read");
    unreadNotifications.value = false;
  } catch (error) {
    console.error("Error marking notifications as read:", error);
  }
}

function toggleVisibility() {
  isVisible.value = !isVisible.value;
  if (isVisible.value && unreadNotifications.value) {
    markNotificationsAsRead();
  }
}

onMounted(() => {
  fetchNotifications();

  window.Echo.private(
    // "notification"
    "App.Models.User." + sessionStorage.getItem("userId")
  ).notification((notification) => {
    console.log(notification);
    fetchNotifications();

    $toast.info(`${notification.seance_id}`, {
      position: "bottom-right",
      duration: 3000,
    });
  });
});

function formatHumanDate(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

function logout() {
  store.dispatch("logout").then(() => {
    router.push({ name: "Login" });
    $toast.success("You are logging out successfully!", {
      position: "bottom-right",
      duration: 3000,
    });
  });
}
</script>

<template>
  <div>
    <nav
      aria-label="secondary"
      :class="[
        'sticky top-0 z-10 px-6 py-4 bg-white flex items-center justify-between transition-transform duration-500 dark:bg-dark-eval-1',
        {
          '-translate-y-full': scrolling.down,
          'translate-y-0': scrolling.up,
        },
      ]"
    >
      <div class="flex items-center gap-2">
        <p>
          📌 {{ userRole }} |
          <span class="font-semibold">{{ userName.toUpperCase() }}</span>
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Button
          icon-only
          variant="secondary"
          @click="toggleDarkMode"
          v-slot="{ iconSizeClasses }"
          class="md:hidden"
          srText="Toggle dark mode"
        >
          <Icon
            icon="mdi:weather-night"
            v-show="!isDark"
            aria-hidden="true"
            :class="iconSizeClasses"
          />
          <Icon
            icon="mdi:white-balance-sunny"
            v-show="isDark"
            aria-hidden="true"
            :class="iconSizeClasses"
          />
        </Button>
      </div>

      <div class="flex items-center gap-2">
        <Button
          iconOnly
          variant="secondary"
          @click="toggleVisibility"
          class="-mx-2 md:inline-flex"
          srText="Notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>

          <div
            class="absolute w-3 h-3 rounded-full bg-red-600 top-5 right-36"
            v-if="unreadNotifications"
          ></div>
        </Button>
        <div
          v-if="isVisible"
          class="absolute w-96 top-20 right-36 bg-white rounded-md shadow-xl z-20 transition-all transform origin-top"
        >
          <ul
            class="overflow-y-auto max-h-96 transition-opacity duration-300"
            :class="{
              'h-0 opacity-0': !isVisible,
              'h-auto opacity-100': isVisible,
            }"
          >
            <li
              v-for="(notification, index) in notifications"
              :key="index"
              class="relative hover:bg-gray-100 transition-colors duration-200"
            >
              <div class="flex justify-between px-4 py-2">
                <div class="w-3/4">
                  <div class="text-base font-medium text-gray-800">
                    {{ notification.data.userName }}
                  </div>
                  <div class="text-sm text-gray-800 mb-1">
                    {{ notification.data.msg }}
                  </div>
                  <router-link
                    v-if="notification.data.seance"
                    :to="{
                      name: 'eleve-seance-details',
                      params: { id: notification.data.seance.id },
                    }"
                  >
                    <span class="cursor-pointer text-xs text-blue-600"
                      >Checkout</span
                    >
                  </router-link>
                </div>
                <div class="w-2/4 text-right text-xs text-gray-500">
                  {{ formatHumanDate(notification.created_at) }}
                </div>
              </div>
              <div
                class="absolute top-0 left-0 w-full h-full invisible group-hover:visible"
              ></div>
              <hr />
            </li>
          </ul>
        </div>

        <Button
          iconOnly
          variant="secondary"
          @click="toggleFullScreen"
          v-slot="{ iconSizeClasses }"
          class="mx-4 hidden md:inline-flex"
          srText="Toggle dark mode"
        >
          <Icon
            icon="mdi:arrow-expand-all"
            v-show="!isFullscreen"
            aria-hidden="true"
            :class="iconSizeClasses"
          />
          <Icon
            icon="mdi:arrow-collapse-all"
            v-show="isFullscreen"
            aria-hidden="true"
            :class="iconSizeClasses"
          />
        </Button>

        <!-- Dropdwon -->
        <Dropdown align="right" width="48">
          <template #trigger>
            <button
              class="flex text-sm transition border-2 border-transparent rounded-md focus:outline-none focus:ring focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark-eval-1"
            >
              <img
                class="object-cover w-8 h-8 rounded-md"
                :src="userAvatar"
                alt="User Name"
              />
            </button>
          </template>
          <template #content>
            <!-- <DropdownLink @click="logout">Log Out</DropdownLink> -->
            <Button @click="logout">Log Out</Button>
          </template>
        </Dropdown>
      </div>
    </nav>

    <!-- Mobile bottom bar -->
    <div
      :class="[
        'fixed inset-x-0 bottom-0 flex items-center justify-between px-4 py-4 sm:px-6 transition-transform duration-500 bg-white md:hidden dark:bg-dark-eval-1',
        {
          'translate-y-full': scrolling.down,
          'translate-y-0': scrolling.up,
        },
      ]"
    >
      <Button icon="mdi:magnify" iconOnly variant="secondary" srText="Search" />

      <router-link :to="{ name: 'Dashboard' }">
        <Logo class="w-10 h-10" />
        <span class="sr-only">K UI</span>
      </router-link>

      <Button
        iconOnly
        variant="secondary"
        @click="sidebarState.isOpen = !sidebarState.isOpen"
        v-slot="{ iconSizeClasses }"
        class="md:hidden"
        srText="toggle menu"
      >
        <Icon
          icon="mdi:menu"
          v-show="!sidebarState.isOpen"
          aria-hidden="true"
          :class="iconSizeClasses"
        />
        <Icon
          icon="mdi:window-close"
          v-show="sidebarState.isOpen"
          aria-hidden="true"
          :class="iconSizeClasses"
        />
      </Button>
    </div>
  </div>
</template>
