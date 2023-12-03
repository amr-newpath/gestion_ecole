<template>
  <section class="antialiased bg-gray-100 text-gray-600 my-16 px-4">
    <div class="flex flex-col justify-center h-full">
      <div class="w-full max-w-6xlxl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header class="px-3 py-4 border-b border-gray-100">
          <h1 class="font-semibold text-gray-800" style="font-size: 25px;">Gestion des services</h1>
        </header>
        <div class="p-3">
          <!-- <button
            @click="createNewService"
            class="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none"
          >
            Create New Service
          </button> -->
          <div class="flex items-center justify-between mb-4">
            <!-- <div class="flex space-x-4">
              <input v-model="searchQuery" placeholder="Search"
                class="block ww-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div> -->
            <!-- Search input -->
            <div class="relative  mb-3 mr-3 mt-[15px] float-left">
              <label for="inputSearch" class="sr-only">Search </label>
              <input id="inputSearch" type="text" placeholder="Search..." v-model="searchQuery" @input="search"
                class="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
              <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="h-4 w-4 text-neutral-500 dark:text-neutral-200">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </span>

            </div>
            <button @click="createNewService" class="btn bg-info px-3 mr-2  h-9 rounded-lg text-dark-eval-3" uk-margin>
              <i class="bi bi-person-plus-fill text-white"></i>
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="table-auto w-full" v-if="!isLoading">
              <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th class="p-3 whitespace-nowrap">
                    <div class="font-semibold text-center">Nom</div>
                  </th>
                  <th class="p-3 whitespace-nowrap">
                    <div class="font-semibold text-center">Prix</div>
                  </th>
                  <th class="p-3 whitespace-nowrapr">
                    <div class="font-semibold text-center">Année Scolaire</div>
                  </th>

                  <th class="p-3 whitespace-nowrap">
                    <div class="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr v-for="(service, index) in filteredServices" :key="index"
                  class="transition-transform hover:scale-101 hover:bg-gray-100">
                  <td class="px-3 py-1 whitespace-nowrap">
                    <div class="text-center">{{ service.service }}</div>
                  </td>
                  <td class="px-3 py-1 whitespace-nowrap">
                    <div class="text-center">{{ service.annee_scolaire_services == null ?
                      "" : service.annee_scolaire_services.price }}</div>
                  </td>
                  <td class="px-3 py-1 whitespace-nowrap">
                    <div class="text-center">{{ service.annee_scolaire_services ?
                      service.annee_scolaire_services.annee_scolaire.annee_scolaire : '' }}</div>
                  </td>
                  <!-- 
                  <td class="p-3 whitespace-nowrap">
                    <div class="flex flex-col items-center space-y-2">
                      <button
                        @click="editService(service)"
                        class="flex items-center justify-center px-5 py-2 rounded-md text-green-500 bg-white hover:bg-green-50 transition duration-300 focus:outline-none focus:ring focus:ring-green-200"
                      >
                        <i class="fa fa-edit mx-2"></i> Edit
                      </button>

                      <button
                        @click="deleteService(service.id)"
                        class="flex items-center justify-center px-3 py-2 rounded-md text-blue-500 bg-white hover:bg-red-50 transition duration-300 focus:outline-none focus:ring focus:ring-red-200"
                      >
                        <i class="fa fa-trash mx-2"></i> Delete
                      </button>
                    </div>
                  </td> -->
                  <td class="px-3 py-1 whitespace-nowrap  text-center">

                    <div class="btn text-warning mr-1" @click="editService(service)">
                      <i class="bi bi-brush-fill"></i>
                    </div>
                    <div class="btn text-danger" @click="deleteService(service)">
                      <i class="bi bi-trash3-fill"></i>
                    </div>
                  </td>
                </tr>
                <tr class="transition-transform hover:scale-101 hover:bg-gray-100">
                  <td colspan="3" class="p-8 whitespace-nowrap text-lg font-semibold text-right bg-gray-50">
                    Total Services:
                    <span class="text-green-500 text-lg mx-2">
                      {{ filteredServices.length }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex justify-center items-center h-32" v-else>
              <div class="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Service Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 mt-2 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-md shadow-lg max-w-md">
        <h3 class="text-lg font-semibold mb-4">Edit Service</h3>
        <form @submit.prevent="updateService">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:h-1/4 px-2 mb-1">
              <label class="block text-sm font-medium">Service:</label>
              <input v-model="selectedService.service" class="w-full my-3 px-3 py-2 border rounded-md" />
            </div>
            <div class="w-full md:h-1/3 px-2 mb-1">
              <label class="block text-sm font-medium">Année Scolaire:</label>
              <select v-model="annee_scolaire_service.annee_scolaire_id" class="w-full my-3 px-3 py-2 border rounded-md">
                <option v-for="(anneescollaire, index) in annee_scolaires" :key="index" :value="anneescollaire.id">{{
                  anneescollaire.annee_scolaire }}</option>
              </select>
            </div>
            <div class="w-full md:h-1/4 px-2 mb-1">
              <label class="block text-sm font-medium">Prix:</label>
              <input v-model="annee_scolaire_service.price" class="w-full my-3 px-3 py-2 border rounded-md"
                type="number" />
            </div>
            <div class="flex justify-end mt-4">
              <button type="button" @click="isEditModalOpen = false" class="mr-2 px-4 py-2 text-gray-500">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Create New Service Modal -->
    <div v-if="isCreateModalOpen" class="fixed inset-0 mt-2 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-md shadow-lg max-w-md">
        <h3 class="text-lg font-semibold mb-4">Create New Service</h3>
        <form @submit.prevent="submitNewService">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:h-1/1 px-2 mb-1">
              <label class="block text-sm font-medium">Nom:</label>
              <input v-model="newService.service" class="w-full my-3 px-3 py-2 border rounded-md" />
            </div>
            <div class="w-full md:h-1/3 px-2 mb-1">
              <label class="block text-sm font-medium">Année Scolaire:</label>
              <select v-model="annee_scolaire_service.annee_scolaire_id" class="w-full my-3 px-3 py-2 border rounded-md">
                <option v-for="(anneescollaire, index) in annee_scolaires" :key="index" :value="anneescollaire.id">{{
                  anneescollaire.annee_scolaire }}</option>
              </select>
            </div>
            <div class="w-full md:h-1/4 px-2 mb-1">
              <label class="block text-sm font-medium">Prix:</label>
              <input v-model="annee_scolaire_service.price" class="w-full my-3 px-3 py-2 border rounded-md"
                type="number" />
            </div>
            <div class="w-full flex justify-end mt-2">
              <button type="button" @click="closeCreateModal" class="mr-2 px-4 py-2 text-gray-500">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">
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
      },
      annee_scolaires: [],
      annee_scolaire_service: {
        price: null,
        service_id: null,
        annee_scolaire_id: null,
      }
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
            service.annee_scolaire_services.price.toLowerCase().includes(lowercaseSearchQuery) ||
            service.annee_scolaire_services.annee_scolaire.annee_scolaire.toLowerCase().includes(lowercaseSearchQuery)
          );
        });
      }

      return filteredServices;
    },

  },

  methods: {
    async getAnneeScolaire() {
      try {
        const response = await axiosClient.get("/administratif/annee_scolaires");
        this.annee_scolaires = response.data;
        console.log(this.annee_scolaires);
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    },

    createNewService() {
      // Open the Create New Service modal
      this.isCreateModalOpen = true;
    },

    closeCreateModal() {
      // Close the Create New Service modal and reset the newService data
      this.isCreateModalOpen = false;
      this.newService = {
        service: "",
      };
      this.annee_scolaire_service = {
        price: null,
        service_id: null,
        annee_scolaire_id: null,
      };
    },

    async submitNewService() {
      try {
        // Make an API call to create the new service
        const response = await axiosClient.post(
          "/administratif/service",
          this.newService
        );
        this.annee_scolaire_service.service_id = response.data.data[0].id;

        try {
          const response1 = await axiosClient.post(
            "/administratif/annee_scolaires_services",
            this.annee_scolaire_service
          );
        } catch (error) {
          console.error("Error creating service:", error);
        }
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
        console.log(this.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async editService(service) {
      // Open a modal or perform other actions to allow editing
      this.selectedService = { ...service };
      if (service.annee_scolaire_services) {
        this.annee_scolaire_service.price = service.annee_scolaire_services.price;
        this.annee_scolaire_service.annee_scolaire_id = service.annee_scolaire_services.annee_scolaire.id;
        this.annee_scolaire_service.service_id = service.id;
      }
      this.isEditModalOpen = true;
    },

    async deleteService(serv) {
      console.log(serv.annee_scolaire_services.id);
      try {
        await axiosClient.delete(`/administratif/services/${serv.id}`);
     
        this.services = this.services.filter(
          (service) => service.id !== serv.id
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
        const res = await axiosClient.put(
          `/administratif/services/${this.selectedService.id}`,
          this.selectedService
        );
        try {
          const response1 = await axiosClient.put(
            `/administratif/upannee?service_idS=${res.data.data[0].id}&annee_scolaire=${res.data.data[0].annee_scolaire_services.annee_scolaire.annee_scolaire}`,
            this.annee_scolaire_service
          );
          console.log(response1);
        } catch (error) {
          console.error("Error creating service:", error);
        }
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
    this.getAnneeScolaire();
  },
};
</script>
