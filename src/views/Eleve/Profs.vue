<template>
  <section class="antialiased bg-gray-100 text-gray-600 my-16 px-4">
    <div class="flex flex-col justify-center h-full">
      <div
        class="w-full max-w-6xlxl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <div class="p-4">
          <h2 class="font-semibold text-2xl text-gray-800">Liste des Profs</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <!-- Loop through matieres and create a box for each matiere -->
          <div
            v-for="(prof, index) in profs"
            :key="index"
            class="bg-gray-200 rounded-lg p-4 hover:bg-gray-300 cursor-pointer"
          >
            <h3 class="text-lg font-semibold text-center">{{ prof.prenom }} {{ prof.nom }}</h3>
            <p class="text-sm text-gray-600  mt-2">✉ <strong>Email</strong> : {{ prof.email }}</p>
            <p class="text-sm text-gray-600  mt-2">📞 <strong>Tel</strong> : {{ prof.tel }}</p>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axiosClient from '@/axios';
export default {
  data() {
    return {
      profs: [],
    };
  },
  created() {
    this.fetchMatieres();
  },
  methods: {
    async fetchMatieres() {
      try {
        const response = await axiosClient.get("/eleve/profs");
        this.profs = response.data;
      } catch (error) {
        console.error("Error fetching Profs:", error);
      }
    },
  },
};
</script>
