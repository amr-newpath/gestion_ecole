<template>
  <section class="antialiased bg-gray-100 text-gray-600 my-16 px-4">
    <div class="flex flex-col justify-center h-full">
      <div
        class="w-full max-w-6xlxl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header class="px-5 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">Gestion des services</h2>
        </header>
        <div class="p-3">
          <!-- <button
            @click="createNewService"
            class="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none"
          >
            Create New Service
          </button> -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex space-x-4">
              <input
                v-model="searchQuery"
                placeholder="Search"
                class="block ww-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              @click="createNewService"
              class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Create New Service
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="table-auto w-full" v-if="!isLoading">
              <thead
                class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
              >
                <tr>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Services</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Type</div>
                  </th>

                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr v-for="(service, index) in filteredServices" :key="index">
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ service.service }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left">{{ service.type }}</div>
                  </td>

                  <td class="p-4 whitespace-nowrap">
                    <div class="flex flex-col items-center space-y-2">
                      <button
                        @click="editService(service)"
                        class="flex items-center justify-center px-4 py-2 rounded-md text-green-500 bg-white hover:bg-green-50 transition duration-300 focus:outline-none focus:ring focus:ring-green-200"
                      >
                        <font-awesome-icon
                          :icon="['fas', 'dollar-sign']"
                          class="h-5 w-5 mr-1"
                        />
                        Edit
                      </button>
                      <button
                        @click="deleteService(service.id)"
                        class="flex items-center justify-center px-4 py-2 rounded-md text-blue-500 bg-white hover:bg-green-50 transition duration-300 focus:outline-none focus:ring focus:ring-green-200"
                      >
                        <font-awesome-icon
                          :icon="['fas', 'dollar-sign']"
                          class="h-5 w-5 mr-1"
                        />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    class="p-8 whitespace-nowrap text-lg font-semibold text-right bg-gray-50"
                  >
                    Total Services:
                    <span class="text-green-500 text-lg mx-2">
                      {{ filteredServices.length }}</span
                    >
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
        </div>
      </div>
    </div>

    <!-- Edit Service Modal -->
    <div
      v-if="isEditModalOpen"
      class="fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-md shadow-lg max-w-md">
        <h3 class="text-lg font-semibold mb-4">Edit Service</h3>
        <form @submit.prevent="updateService">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Service:</label>
              <input
                v-model="selectedService.service"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Type:</label>
              <input
                v-model="selectedService.type"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="flex justify-end mt-4">
              <button
                type="button"
                @click="isEditModalOpen = false"
                class="mr-2 px-4 py-2 text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Create New Service Modal -->
    <div
      v-if="isCreateModalOpen"
      class="fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-md shadow-lg max-w-md">
        <h3 class="text-lg font-semibold mb-4">Create New Service</h3>
        <form @submit.prevent="submitNewService">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Service:</label>
              <input
                v-model="newService.service"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Type:</label>
              <input
                v-model="newService.type"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="flex justify-end mt-4">
              <button
                type="button"
                @click="closeCreateModal"
                class="mr-2 px-4 py-2 text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axiosClient from "../../../axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  data() {
    return {
      isLoading: false,
      searchQuery: "",
      services: [],
      selectedService: null,
      isEditModalOpen: false,
      isCreateModalOpen: false,
      newService: {
        service: "",
        type: "",
      },
    };
  },
  computed: {
    filteredServices() {
      let filteredServices = this.services;

      if (this.searchQuery) {
        const lowercaseSearchQuery = this.searchQuery.toLowerCase();
        filteredServices = filteredServices.filter((service) => {
          return (
            service.service.toLowerCase().includes(lowercaseSearchQuery) ||
            service.type.toLowerCase().includes(lowercaseSearchQuery)
          );
        });
      }

      return filteredServices;
    },
  },

  methods: {
    createNewService() {
      // Open the Create New Service modal
      this.isCreateModalOpen = true;
    },

    closeCreateModal() {
      // Close the Create New Service modal and reset the newService data
      this.isCreateModalOpen = false;
      this.newService = {
        service: "",
        type: "",
      };
    },

    async submitNewService() {
      try {
        // Make an API call to create the new service
        const response = await axiosClient.post(
          "/administratif/service",
          this.newService
        );

        // Add the newly created service to the list
        this.services.push(response.data);

        $toast.success("Service created successfully!", {
          position: "bottom-right",
          duration: 3000,
        });

        // Close the Create New Service modal and reset the newService data
        this.closeCreateModal();
        await this.fetchServices();
      } catch (error) {
        console.error("Error creating service:", error);
        $toast.error("An error occurred while creating the service.", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    },

    async fetchServices() {
      try {
        this.isLoading = true;
        const response = await axiosClient.get("/administratif/services");
        this.services = response.data;
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async editService(service) {
      // Open a modal or perform other actions to allow editing
      this.selectedService = { ...service };
      this.isEditModalOpen = true;
    },

    async deleteService(serviceId) {
      try {
        // Make an API call to delete the eleve
        await axiosClient.delete(`/administratif/services/${serviceId}`);

        // Remove the deleted eleve from the list
        this.services = this.services.filter(
          (service) => service.id !== serviceId
        );

        $toast.success("Service deleted successfully!", {
          position: "bottom-right",
          duration: 3000,
        });

        // window.location.reload();
        await this.fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    },

    async updateService() {
      try {
        // Make an API call to update the eleve
        await axiosClient.put(
          `/administratif/services/${this.selectedService.id}`,
          this.selectedService
        );

        // Update the eleve in the list with the edited data
        const index = this.services.findIndex(
          (service) => service.id === this.selectedService.id
        );
        if (index !== -1) {
          this.services[index] = { ...this.selectedService };
        }

        $toast.success("Service Info updated successfully!", {
          position: "bottom-right",
          duration: 3000,
        });

        // Close the edit modal
        this.isEditModalOpen = false;
        this.selectedService = null;

        // window.location.reload();
        await this.fetchServices();
      } catch (error) {
        console.error("Error updating service:", error);
      }
    },
  },
  async mounted() {
    await this.fetchServices();
  },
};
</script>
