<template>
  <div class="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-semibold mb-4">Weekly Planner</h1>
    <div class="flex items-center justify-between mb-4">
      <div class="flex space-x-4">
        <!-- <select
          v-model="selectedNiveau"
          @change="filteredCourses"
          class="px-8 py-1 border rounded-md focus:outline-none"
        >
          <option value="">Niveau</option>
          <option value="BAC">BAC1</option>
          <option value="BAC2">BAC2</option>
          <option value="CA1">CP</option>
        </select> -->

        <label for="classe" class="flex items-center"> Classe</label>
        <select
          id="classe"
          v-model="selectedClasse"
          @change="filteredCourses"
          class="px-8 py-1 border rounded-md focus:outline-none"
        >
          <option
            v-for="classe in classes"
            :key="classe.id"
            :value="classe.nom"
          >
            {{ classe.nom }}
          </option>
        </select>

        <label for="trimestre" class="flex items-center"> Trimestre</label>

        <select
          id="trimestre"
          v-model="selectedTrimestre"
          @change="filteredCourses"
          class="px-8 py-1 border rounded-md focus:outline-none"
        >
          <option value="">Trimestre</option>
          <option value="Tr1">Tr1</option>
          <option value="Tr2">Tr2</option>
          <option value="Tr3">Tr3</option>
        </select>
      </div>

      <button
        @click="openCreateModal"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Create New Course
      </button>
    </div>

    <div class="flex mt-4">
      <div
        v-for="day in days"
        :key="day"
        class="flex-1 flex flex-col my-4 items-center"
      >
        <div class="p-2 border-b border-gray-300 day-box">{{ day }}</div>
        <div v-if="selectedClasse" class="flex my-6 flex-col">
          <div
            v-for="course in coursesByDay(day)"
            :key="course.id"
            :style="{ backgroundColor: course.color }"
            class="text-white rounded-lg p-2 mt-2 course-box"
            @click="openCourseModal(course)"
          >
            <div class="flex flex-wrap justify-between">
              <div class="w-full my-2 sm:w-auto sm:flex-1">
                <p class="font-bold text-lg text-center">
                  {{ course.matiere.name }}
                </p>
                <p class="text-center">({{ course.type }})</p>
              </div>
              <div class="w-full sm:w-auto text">
                <p class="">💡 {{ course.description }}</p>
                <p>👨‍🏫 <strong>Prof:</strong> Mr. {{ course.prof.nom }}</p>
                <p>📅 <strong>Day:</strong> {{ course.day }}</p>
                <p>
                  ⌛
                  <i> {{ course.start_time }} - {{ course.end_time }}</i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Information Modal Form -->
    <div
      v-if="isCourseModalOpen"
      class="fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-5 rounded-md shadow-lg max-w-md">
        <h3 class="text-lg font-semibold mb-4">Course Information</h3>
        <form @submit.prevent="updateCourse">
          <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Matiere</label>
              <select
                v-model="selectedCourse.matiere.id"
                class="my-3 px-10 py-2 border rounded-md"
              >
                <option
                  v-for="matiere in matieres"
                  :key="matiere.id"
                  :value="matiere.id"
                >
                  {{ matiere.name }}
                </option>
              </select>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Prof</label>
              <select
                v-model="selectedCourse.prof.id"
                class="my-3 px-14 py-2 border rounded-md"
              >
                <option v-for="prof in profs" :key="prof.id" :value="prof.id">
                  {{ prof.nom }} {{ prof.prenom }}
                </option>
              </select>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Type</label>
              <select
                v-model="selectedCourse.type"
                class="w-full my-3 px-3 py-2 border rounded-md"
              >
                <option value="Cours">Cours</option>
                <option value="Exercices">Exercices</option>
                <option value="TP">TP</option>
              </select>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Description</label>
              <input
                v-model="selectedCourse.description"
                class="my-3 px-3 py-2 border rounded-md"
              />
            </div>

            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Day</label>
              <select
                v-model="selectedCourse.day"
                class="w-full my-3 px-3 py-2 border rounded-md"
              >
                <option value="Lundi">Lundi</option>
                <option value="Mardi">Mardi</option>
                <option value="Mercredi">Mercredi</option>
                <option value="Jeudi">Jeudi</option>
                <option value="Vendredi">Vendredi</option>
                <option value="Samedi">Samedi</option>
              </select>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Trimestre</label>
              <select
                v-model="selectedCourse.trimestre"
                class="w-full my-3 px-3 py-2 border rounded-md"
              >
                <option value="Tr1">Tr1</option>
                <option value="Tr2">Tr2</option>
                <option value="Tr3">Tr3</option>
              </select>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Start Time</label>
              <input
                v-model="selectedCourse.start_time"
                type="time"
                class="my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">End Time</label>
              <input
                v-model="selectedCourse.end_time"
                type="time"
                class="my-3 px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div class="flex justify-between mt-6">
            <button @click="closeCourseModal" class="px-4 py-2 text-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-1 bg-blue-500 text-white rounded-md"
            >
              Update
            </button>
            <button
              @click="deleteCourse"
              class="px-4 py-1 bg-red-500 text-white rounded-md"
            >
              Delete Course
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="isCreateModalOpen"
      class="fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-md shadow-lg max-w-md">
        <h3 class="text-lg font-semibold mb-4">Create New Course</h3>
        <form @submit.prevent="submitNewCourse">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Matieres</label>
              <select
                v-model="newCourse.matiere"
                class="w-full my-3 px-3 py-2 border rounded-md"
              >
                <option
                  v-for="matiere in matieres"
                  :key="matiere.id"
                  :value="matiere.id"
                >
                  {{ matiere.name }}
                </option>
              </select>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Description</label>
              <input
                v-model="newCourse.description"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Type</label>
              <select
                v-model="newCourse.type"
                class="w-full my-3 px-3 py-2 border rounded-md"
              >
                <option value="Cours">Cours</option>
                <option value="Exercices">Exercices</option>
                <option value="TP">TP</option>
              </select>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Day</label>
              <select
                v-model="newCourse.day"
                class="w-full my-3 px-3 py-2 border rounded-md"
              >
                <option value="Lundi">Lundi</option>
                <option value="Mardi">Mardi</option>
                <option value="Mercredi">Mercredi</option>
                <option value="Jeudi">Jeudi</option>
                <option value="Vendredi">Vendredi</option>
                <option value="Samedi">Samedi</option>
              </select>
            </div>
            <div class="w-full md:w-full px-2 mb-4">
              <label class="block text-sm font-medium">Trimestre</label>
              <select
                v-model="newCourse.trimestre"
                class="w-full my-3 px-3 py-2 border rounded-md"
              >
                <option value="Tr1">Tr1</option>
                <option value="Tr2">Tr2</option>
                <option value="Tr3">Tr3</option>
              </select>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Start Time</label>
              <input
                type="time"
                v-model="newCourse.startTime"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">End Time</label>
              <input
                type="time"
                v-model="newCourse.endTime"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Classe</label>
              <select
                v-model="newCourse.classe"
                class="w-full my-3 px-3 py-2 border rounded-md"
              >
                <option
                  v-for="classe in classes"
                  :key="classe.id"
                  :value="classe.id"
                >
                  {{ classe.nom }}
                </option>
              </select>
            </div>

            <div class="w-full md:w-1/2 px-2 mb-4">
              <label class="block text-sm font-medium">Professeur</label>
              <select
                v-model="newCourse.prof"
                class="w-full my-3 px-3 py-2 border rounded-md"
              >
                <option v-for="prof in profs" :key="prof.id" :value="prof.id">
                  {{ prof.nom }} {{ prof.prenom }}
                </option>
              </select>
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
  </div>
</template>

<script>
import axiosClient from "@/axios";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  data() {
    return {
      selectedNiveau: "",
      selectedClasse: "",
      selectedTrimestre: "",
      days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      // color: "",
      courses: [],
      matieres: [],
      profs: [],
      classes: [],
      newCourse: {
        matiere: "",
        description: "",
        type: "Cours",
        day: "Lundi",
        trimestre: "Tr1",
        startTime: "",
        endTime: "",
        prof: "",
        classe: "",
      },
      colors: [
        "#FF5733",
        "#FFC300",
        "#C70039",
        "#2E86AB",
        "#F7DC6F",
        "#C4E538",
        "#FDA7DF",
        "#F8A5C2",
        "#12CBC4",
        "#1289A7",
        "#D980FA",
        "#FDA7DF",
        "#D980FA",
        "#8B78E6",
        "#9980FA",
        "#5758BB",
        "#3B3B98",
      ],
      isCreateModalOpen: false,
      isCourseModalOpen: false,
      selectedCourse: null,
    };
  },
  methods: {
    openCourseModal(course) {
      this.selectedCourse = { ...course }; // Make a copy of the course object
      this.isCourseModalOpen = true;
    },
    closeCourseModal() {
      this.selectedCourse = null;
      this.isCourseModalOpen = false;
    },
    async updateCourse() {
      try {
        const requestData = {
          matiere_id: this.selectedCourse.matiere.id,
          description: this.selectedCourse.description,
          type: this.selectedCourse.type,
          day: this.selectedCourse.day,
          start_time: this.selectedCourse.start_time,
          end_time: this.selectedCourse.end_time,
          trimestre: this.selectedCourse.trimestre,
          prof_id: this.selectedCourse.prof.id,
          // classe_id: this.selectedCourse.classe.id,
        };

        const response = await axiosClient.put(
          `/administratif/plannings/${this.selectedCourse.id}`,
          requestData
        );

        $toast.success("Planning updated successfully!", {
          position: "bottom-right",
          duration: 3000,
        });
        // console.log("Course updated:", response.data);

        this.closeCourseModal();
      } catch (error) {
        console.error("Error updating course:", error);
      }
    },

    async deleteCourse() {
      try {
        const response = await axiosClient.delete(
          `/administratif/plannings/${this.selectedCourse.id}`
        );

        // console.log("Course deleted:", response.data);
        $toast.success("Planning deleted successfully!", {
          position: "bottom-right",
          duration: 3000,
        });

        this.closeCourseModal();

        this.fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    },

    async fetchCourses() {
      try {
        const response = await axiosClient.get("/administratif/plannings");
        const fetchedCourses = response.data;
        this.courses = fetchedCourses;
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    },
    async fetchMatieres() {
      try {
        const response = await axiosClient.get("/administratif/matieres");
        this.matieres = response.data;

        // if (this.matieres.length > 0) {
        //   this.newCourse.matiere = this.matieres[0].name;
        // }
      } catch (error) {
        console.error("Error fetching Matieres:", error);
      }
    },
    fetchProfs() {
      axiosClient
        .get("/administratif/profs")
        .then((response) => {
          this.profs = response.data;
          this.newCourse.prof = this.profs[0].id;
        })
        .catch((error) => {
          console.error("Error fetching professors:", error);
        });
    },
    fetchClasses() {
      axiosClient
        .get("/classes")
        .then((response) => {
          this.classes = response.data;
          this.selectedClasse = this.classes[0].nom;
          this.newCourse.classe = this.classes[0].id;
          this.selectedTrimestre = "Tr1";
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    },
    openCreateModal() {
      this.isCreateModalOpen = true;
    },
    closeCreateModal() {
      this.isCreateModalOpen = false;
    },
    submitNewCourse() {
      const randomIndex = Math.floor(Math.random() * this.colors.length);
      const randomColor = this.colors[randomIndex];

      this.color = randomColor;
      // Prepare the data to be sent to the API
      const requestData = {
        color: randomColor,
        type: this.newCourse.type,
        description: this.newCourse.description,
        day: this.newCourse.day,
        start_time: this.newCourse.startTime,
        end_time: this.newCourse.endTime,
        trimestre: this.newCourse.trimestre,
        matiere_id: this.newCourse.matiere,
        classe_id: this.newCourse.classe,
        prof_id: this.newCourse.prof, // Make sure to select the appropriate property name for prof_id
      };

      // Make an API POST request to create a new planning entry
      axiosClient
        .post("/administratif/create-planning", requestData)
        .then((response) => {
          // Handle the successful response, e.g., show a success message or redirect
          // console.log("New planning entry created:", response.data);

          $toast.success("Planning created successfully!", {
            position: "bottom-right",
            duration: 3000,
          });

          // Clear the form and close the modal
          this.fetchCourses();
          this.newCourse = {
            description: "",
            type: "Cours",
            day: "Lundi",
            trimestre: "Tr1",
            startTime: "",
            endTime: "",
            matiere: null,
            classe: null,
            prof: null,
          };
          this.isCreateModalOpen = false;
        })
        .catch((error) => {
          // Handle the error, e.g., show an error message
          console.error("Error creating planning entry:", error);
        });
    },
  },
  created() {
    this.fetchCourses();
    this.fetchMatieres();
    this.fetchProfs();
    this.fetchClasses();
  },
  computed: {
    filteredCourses() {
      // Filter the courses array based on selected filters
      return this.courses.filter((course) => {
        // const niveauMatch =
        //   !this.selectedNiveau || course.niveau === this.selectedNiveau;

        console.log(this.selectedClasse);

        const classeMatch =
          !this.selectedClasse || course.classe.nom === this.selectedClasse;

        const trimestreMatch =
          !this.selectedTrimestre ||
          course.trimestre.toLowerCase() ===
            this.selectedTrimestre.toLowerCase();

        return classeMatch && trimestreMatch;
      });
    },
    coursesByDay() {
      return (day) => {
        return this.filteredCourses.filter((course) => course.day === day);
      };
    },
  },
};
</script>

<style scoped>

.course-box:hover {
  transform: scale(1.04); 
  transition: transform 0.3s ease; 
  cursor: pointer;
}
.day-box:hover {
  background-color: #f0f0f0;
  transition: background-color 0.3s ease-in-out;
}
</style>
