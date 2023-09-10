<template>
  <div class="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-semibold mb-4">Weekly Planner</h1>
    <button
      @click="createCourse"
      class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Create New Course
    </button>
    <div class="flex mt-4">
      <div
        v-for="day in days"
        :key="day"
        class="flex-1 flex flex-col items-center "
      >
        <div class="p-2 border-b border-gray-300 day-box">{{ day }}</div>
        <div class="flex flex-col">
          <div
            v-for="course in coursesByDay(day)"
            :key="course.id"
            :style="{ backgroundColor: course.color }"
            class="text-white rounded-lg p-2 mt-2"
          >
            {{ course.subject }} - {{ course.time }}
          </div>
        </div>
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
        subject: "Math",
        day: "Mardi",
        time: "12:00h",
      },
      colors: [
        "#FF5733", "#FFC300", "#FF5733", "#C70039", "#900C3F",
        "#2E86AB", "#F7DC6F", "#EA2027", "#006266",
        "#C4E538", "#FDA7DF", "#F8A5C2", "#12CBC4", "#1289A7", "#D980FA",
        "#FDA7DF", "#D980FA", "#8B78E6", "#9980FA", "#5758BB",
      ],
    };
  },
  methods: {
    createCourse() {
      const randomIndex = Math.floor(Math.random() * this.colors.length);
      const randomColor = this.colors[randomIndex];
      this.courses.push({ ...this.newCourse, color: randomColor });
      this.newCourse = { subject: "", day: "", time: "" };
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
