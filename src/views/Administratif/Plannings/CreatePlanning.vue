<template>
  <div class="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-semibold mb-4">Weekly Planner</h1>
    <button
      @click="openCreateModal"
      class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      Create New Course
    </button>
    <div class="flex mt-4">
      <div
        v-for="day in days"
        :key="day"
        class="flex-1 flex flex-col items-center"
      >
        <div class="p-2 border-b border-gray-300 day-box">{{ day }}</div>
        <div class="flex flex-col">
          <div
            v-for="course in coursesByDay(day)"
            :key="course.id"
            :style="{ backgroundColor: course.color }"
            class="text-white rounded-lg p-2 mt-2"
          >
            <div class="flex flex-wrap justify-between">
              <div class="w-full sm:w-auto sm:flex-1">
                <p class="font-bold text-lg">{{ course.title }}</p>
                <p><strong>Description:</strong> {{ course.description }}</p>
              </div>
              <div class="w-full sm:w-auto">
                <p><strong>Type:</strong> {{ course.type }}</p>
                <p><strong>Day:</strong> {{ course.day }}</p>
                <p> <i> {{ course.startTime }} - {{ course.endTime }}</i></p>
              </div>
            </div>
          </div>
        </div>
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
              <label class="block text-sm font-medium">Title</label>
              <input
                v-model="newCourse.title"
                class="w-full my-3 px-3 py-2 border rounded-md"
              />
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
export default {
  data() {
    return {
      days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      courses: [],
      newCourse: {
        title: "",
        description: "",
        type: "Cours",
        day: "Lundi",
        trimestre: "Tr1",
        startTime: "",
        endTime: "",
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
    };
  },
  methods: {
    openCreateModal() {
      this.isCreateModalOpen = true;
    },
    closeCreateModal() {
      this.isCreateModalOpen = false;
    },
    submitNewCourse() {
      const randomIndex = Math.floor(Math.random() * this.colors.length);
      const randomColor = this.colors[randomIndex];
      this.courses.push({ ...this.newCourse, color: randomColor });
      this.newCourse = {
        title: "",
        description: "",
        type: "Cours",
        day: "Lundi",
        trimestre: "Tr1",
        startTime: "",
        endTime: "",
      };
      this.isCreateModalOpen = false;
    },
  },
  computed: {
    coursesByDay() {
      return (day) => {
        return this.courses.filter((course) => course.day === day);
      };
    },
  },
};
</script>

<style scoped>
.day-box:hover {
  background-color: #f0f0f0;
  transition: background-color 0.3s ease-in-out;
}
</style>
