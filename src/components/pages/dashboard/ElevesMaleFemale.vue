<template>
  <div class="chart-container">
    <div class="chart-header">
      <h2 class="chart-title">Gender Distribution</h2>
    </div>
    <div class="chart-content">
      <canvas id="genderChart" style="max-width: 400px; margin: 0 auto;"></canvas>
      <div class="chart-icons">
        <div class="chart-icon girl-icon">
          <Icon icon="fa-solid:female" />
        </div>
        <div class="chart-icon boy-icon">
          <Icon icon="fa-solid:male" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../../axios";
import Chart from "chart.js/auto";
import { Icon } from "@iconify/vue";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      eleves: [],
      totalElevesCount: 0,
    };
  },
  async mounted() {
    await this.fetchEleves();
    this.createGenderChart();
  },
  methods: {
    async fetchEleves() {
      try {
        const response = await axiosClient.get("/comptable/eleves");
        this.eleves = response.data;
        this.calculateGenderPercentage();
      } catch (error) {
        console.error("Error fetching eleves:", error);
      }
    },
    calculateGenderPercentage() {
      const totalGirls = this.eleves.filter((eleve) => eleve.sexe === "Female").length;
      const totalBoys = this.eleves.filter((eleve) => eleve.sexe === "Male").length;
      this.totalElevesCount = totalGirls + totalBoys;
      this.createGenderChart(totalGirls, totalBoys);
    },
    createGenderChart(totalGirls, totalBoys) {
      const genderCtx = document.getElementById("genderChart").getContext("2d");
      new Chart(genderCtx, {
        type: "doughnut",
        data: {
          labels: ["Girls", "Boys"],
          datasets: [
            {
              data: [totalGirls, totalBoys],
              backgroundColor: ["#FF69B4", "#1E90FF"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%", // Adjust this value to control the size of the hole in the center
          animation: {
            duration: 0, // Set duration to 0 to disable animations
          },
          plugins: {
            datalabels: {
              color: "white",
              formatter: (value, ctx) => {
                return `${value} (${((value / this.totalElevesCount) * 100).toFixed(1)}%)`;
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style>
.chart-container {
  text-align: center;
  padding: 20px;
}

.chart-header {
  margin-bottom: 10px;
}

.chart-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.chart-content {
  position: relative;
}

.chart-icons {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  width: 100px;
}

.chart-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
}

.girl-icon {
  color: #FF69B4;
}

.boy-icon {
  color: #1E90FF;
}
</style>
