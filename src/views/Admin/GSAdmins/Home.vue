<template>
  <section class="antialiased bg-gray-100 text-gray-600 h-screen px-4">
    <div class="flex flex-col justify-center h-full">
      <div
        class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header class="px-5 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">users</h2>
        </header>

        <div class="p-3">
          <div class="mb-4 flex justify-between items-center">
            <div class="relative w-1/3">
              <select
                v-model="selectedRole"
                class="block w-full px-4 py-2 pr-8 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">All Roles</option>
                <option value="Administratif">Administratif</option>
                <option value="Comptable">Comptable</option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 9l-3 3-3-3"
                  ></path>
                </svg>
              </div>
            </div>

            <div class="mb-4 flex justify-end">
              <button
                @click="createUser"
                class="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                Create User
              </button>
            </div>
          </div>
          <div class="relative w-full mb-4">
            <input
              v-model="searchTerm"
              @input="applySearch"
              type="text"
              class="block w-full px-4 py-2 pr-8 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Search..."
            />
            <div
              class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 9l-3 3-3-3"
                ></path>
              </svg>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="table-auto w-full" v-if="!isLoading">
              <thead
                class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
              >
                <tr>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Name</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Role</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Code</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Email</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Tele</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr v-for="(user, index) in paginatedList" :key="index">
                  <td class="p-2 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                        <img
                          class="rounded-full"
                          :src="user.image"
                          width="40"
                          height="40"
                          :alt="user.name"
                        />
                      </div>
                      <div class="font-medium text-gray-800">
                        {{ user.name }}
                      </div>
                    </div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left">{{ user.role }}</div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left">{{ user.code }}</div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left">{{ user.email }}</div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left">{{ user.tele }}</div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="flex justify-center space-x-2">
                      <button
                        @click="editUser(index)"
                        class="text-blue-500 hover:underline"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteUser(index)"
                        class="text-red-500 hover:underline"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex justify-center items-center h-32" v-else>
              <div
                class="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
              ></div>
            </div>
          </div>

          <div class="mt-4 flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-700">
                Showing {{ startItem }} to {{ endItem }} of
                {{ filteredList.length }} entries
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-3 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Previous
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === pageCount"
                class="px-3 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axiosClient from "../../../axios";
export default {
  data() {
    return {
      isLoading: true,
      selectedRole: "",
      searchTerm: "",
      users: [],
      itemsPerPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    filteredList() {
      if (!this.selectedRole && !this.searchTerm) {
        return this.users;
      }

      return this.users.filter((user) => {
        let matchRole = true;
        let matchSearch = true;

        if (this.selectedRole) {
          matchRole = user.role === this.selectedRole;
        }

        if (this.searchTerm) {
          const searchTermLower = this.searchTerm.toLowerCase();
          matchSearch =
            (user.name && user.name.toLowerCase().includes(searchTermLower)) ||
            (user.role && user.role.toLowerCase().includes(searchTermLower)) ||
            (user.email &&
              user.email.toLowerCase().includes(searchTermLower)) ||
            (user.code && user.code.toLowerCase().includes(searchTermLower));
        }

        return matchRole && matchSearch;
      });
    },

    pageCount() {
      return Math.ceil(this.filteredList.length / this.itemsPerPage);
    },
    startItem() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    endItem() {
      const end = this.currentPage * this.itemsPerPage;
      return end > this.filteredList.length ? this.filteredList.length : end;
    },
    paginatedList() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredList.slice(
        startIndex,
        startIndex + this.itemsPerPage,
      );
    },
  },
  methods: {
    fetchUsers() {
      this.isLoading = true;

      axiosClient
        .get("/admin/get-all-admins")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    applySearch() {},

    editUser(index) {
      const userId = this.filteredList[index].id;

      console.log("userId, ", userId);

      this.$router.push({ name: "EditUser", params: { id: userId } });
    },

    deleteUser(index) {
      const userId = this.filteredList[index].id;

      if (confirm("Are you sure you want to delete this user?")) {
        axiosClient
          .delete(`/admin/delete-user/${userId}`)
          .then(() => {
            this.fetchUsers();
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      }
    },
    createUser() {
      this.$router.push({ name: "AccountAdmins" });
    },
    prevPage() {
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
