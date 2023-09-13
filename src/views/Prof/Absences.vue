<template>
  <section class="antialiased bg-gray-100 text-gray-600 my-16 px-4">
    <div class="flex flex-col justify-center h-full">
      <div
        class="w-full max-w-6xlxl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header class="px-5 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">Liste des absences</h2>
        </header>
        <div class="p-3">
          <div class="flex items-center justify-between mb-4">
            <div class="flex space-x-4">
              <input
                v-model="searchQuery"
                placeholder="Search"
                class="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div class="flex space-x-4">
              <select
                v-model="selectedClasse"
                class="px-8 py-2 border rounded-md focus:outline-none"
              >
                <option value="">Filter by Classe</option>
                <option
                  v-for="classe in classes"
                  :key="classe.id"
                  :value="classe.id"
                >
                  {{ classe.nom }}
                </option>
              </select>
            </div>
            <div class="flex space-x-4">
              <select
                v-model="selectedMatiere"
                class="px-8 py-2 border rounded-md focus:outline-none"
              >
                <option value="">Filter by Matiere</option>
                <option
                  v-for="matiere in matieres"
                  :key="matiere.id"
                  :value="matiere.id"
                >
                  {{ matiere.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="table-auto w-full" v-if="!isLoading">
              <thead
                class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
              >
                <tr>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">Eleve</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-left">
                      Number of absences
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr
                  v-for="(student, index) in filteredStudents"
                  :key="index"
                  class="transition-transform hover:scale-101 hover:bg-gray-100"
                >
                  <td class="p-4 whitespace-nowrap">
                    <div class="text-left font-semibold">
                      {{ student.nom_complet }}
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <div
                      class="bg-yellow-500 text-white ml-10 rounded-full w-7 text-center"
                    >
                      {{ filteredStudents[0].absences || 0 }}
                    </div>
                  </td>
                </tr>
                <tr
                  class="transition-transform hover:scale-101 hover:bg-gray-100"
                >
                  <td
                    colspan="2"
                    class="p-8 whitespace-nowrap text-lg font-semibold text-right bg-gray-50"
                  >
                    Total students:
                    <span class="text-green-500 text-lg mx-2">
                      {{ filteredStudents.length }}
                    </span>
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
  </section>
</template>

<script>
import axiosClient from "@/axios";

export default {
  data() {
    return {
      isLoading: false,
      searchQuery: "",
      selectedClasse: "",
      selectedMatiere: "",
      studentAbsences: {},
      matieres: [],
      classes: [],
      absences: [],
    };
  },
  created() {
    this.fetchMatieres();
    this.fetchClasses();
    this.fetchAbsences();
  },
  computed: {
    filteredStudents() {
      // Filter by search query
      let filteredAbsences = this.absences;
      if (this.searchQuery) {
        const lowercaseSearchQuery = this.searchQuery.toLowerCase();
        filteredAbsences = filteredAbsences.filter((absence) => {
          return absence.eleve.nom_complet
            .toLowerCase()
            .includes(lowercaseSearchQuery);
        });
      }

      // Filter by selected class
      if (this.selectedClasse) {
        filteredAbsences = filteredAbsences.filter((absence) => {
          return absence.eleve.classe_id === this.selectedClasse;
        });
      }

      // Create a map to track absences per student for the selected matiere
      const studentAbsencesMap = {};

      if (this.selectedMatiere) {
        filteredAbsences = filteredAbsences.filter((absence) => {
          return absence.seance.matiere_id === this.selectedMatiere;
        });

        console.log("filteredAbsences, ", filteredAbsences);

        filteredAbsences.forEach((absence) => {
          const studentId = absence.eleve.id;
          if (!studentAbsencesMap[studentId]) {
            studentAbsencesMap[studentId] = {
              id: studentId,
              nom_complet: absence.eleve.nom_complet,
              absences: 0,
            };
          }
          studentAbsencesMap[studentId].absences++;
        });
        // console.log("studentAbsencesMap, ", studentAbsencesMap);
      } else {
        // If no matiere is selected, include all matieres
        filteredAbsences.forEach((absence) => {
          const studentId = absence.eleve.id;
          if (!studentAbsencesMap[studentId]) {
            studentAbsencesMap[studentId] = {
              id: studentId,
              nom_complet: absence.eleve.nom_complet,
              absences: 0,
            };
          }
          studentAbsencesMap[studentId].absences++;
        });
      }

      // console.log("studentAbsencesMap, ", studentAbsencesMap);


      return Object.values(studentAbsencesMap);
    },
  },

  methods: {
    fetchClasses() {
      axiosClient
        .get("/prof/classes")
        .then((response) => {
          this.classes = response.data;
          this.selectedClasse = this.classes[0].id;
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    },
    async fetchMatieres() {
      try {
        const response = await axiosClient.get("/prof/matieres");
        this.matieres = response.data;
      } catch (error) {
        console.error("Error fetching Matieres:", error);
      }
    },
    async fetchAbsences() {
      try {
        const response = await axiosClient.get("/prof/absences");
        this.absences = response.data;
        // Initialize studentAbsences object
        this.absences.forEach((absence) => {
          const studentId = absence.eleve.id;
          if (!this.studentAbsences[studentId]) {
            this.studentAbsences[studentId] = 0;
          }

          // Increment the absences count for the student
          this.studentAbsences[studentId]++;
        });
      } catch (error) {
        console.error("Error fetching Absences:", error);
      }
    },
  },
};
</script>
