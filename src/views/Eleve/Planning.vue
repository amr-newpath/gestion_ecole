<template>
  <div
    class="container mx-auto mt-4 p-4 bg-white rounded-lg shadow-lg container-parent"
  >
    <h1 class="text-2xl font-semibold mb-4">Weekly Planner</h1>

    <div class="flex space-x-4">
      <label for="trimestre" class="flex items-center"> Trimestre</label>

      <select
        id="trimestre"
        v-model="selectedTrimestre"
        @change="filteredCourses"
        class="px-8 py-1 border rounded-md focus:outline-none"
      >
        <!-- <option value="">Trimestre</option> -->
        <option value="Tr1">Tr1</option>
        <option value="Tr2">Tr2</option>
        <option value="Tr3">Tr3</option>
      </select>
    </div>

    <div class="course-container">
    <div class="flex mt-4">
      <div
        v-for="day in days"
        :key="day"
        class="flex-1 flex flex-col my-4 items-center"
      >
        <div class="p-2 border-b border-gray-300 day-box">{{ day }}</div>
        <div class="flex my-6 flex-col">
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
  </div>
  </div>
</template>

<script>
import axiosClient from "@/axios";

export default {
  data() {
    return {
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
    };
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await axiosClient.get("/eleve/planningsClasse");
        const fetchedCourses = response.data;
        this.courses = fetchedCourses;
        this.selectedTrimestre = "Tr1";
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    },

    // fetchClasses() {
    //   axiosClient
    //     .get("/classes")
    //     .then((response) => {
    //       this.classes = response.data;
    //       this.selectedClasse = this.classes[0].nom;
    //       this.newCourse.classe = this.classes[0].id;
    //       this.selectedTrimestre = "Tr1";
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching classes:", error);
    //     });
    // },
  },
  created() {
    this.fetchCourses();
  },
  computed: {
    filteredCourses() {
      // Filter the courses array based on selected filters
      return this.courses.filter((course) => {
        // const niveauMatch =
        //   !this.selectedNiveau || course.niveau === this.selectedNiveau;

        console.log(this.selectedClasse);

        const trimestreMatch =
          !this.selectedTrimestre ||
          course.trimestre.toLowerCase() ===
            this.selectedTrimestre.toLowerCase();

        return trimestreMatch;
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

.container-parent {
  margin-left: 12px;
}

.course-container {
  max-height: 600px; /* Adjust this value as needed */
  overflow-y: auto;
}
.course-box:hover {
  transform: scale(1.04);
  transition: transform 0.3s ease;
}
.day-box:hover {
  background-color: #f0f0f0;
  transition: background-color 0.3s ease-in-out;
}
</style>
