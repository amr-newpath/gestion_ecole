<template>
    <div>
      <nav class="mt-5 flex items-center justify-between text-sm mb-5" aria-label="Page navigation example">
        <p>
          Showing <strong>{{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, totalItems) }}</strong> of <strong>{{ totalItems }}</strong>
        </p>
        <ul class="list-style-none flex">
          <li>
            <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              @click="previousPage"
            >
              Previous
            </a>
          </li>
          <li v-for="page in pages" :key="page" :class="{ 'aria-current': page === currentPage }">
            <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              @click="changePage(page)"
            >
              {{ page }}
            </a>
          </li>
          <li>
            <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover-bg-neutral-100 dark:text-white dark:hover-bg-neutral-700 dark:hover:text-white"
              @click="nextPage"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
      <!-- Your data list here -->
      <div>
        <!-- Display your data using the computed property or any other method -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      totalItems: Number,
      itemsPerPage: Number,
    },
    data() {
      return {
        currentPage: 1,
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
      },
      pages() {
        const startPage = Math.max(this.currentPage - 2, 1);
        const endPage = Math.min(startPage + 4, this.totalPages);
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        return pages;
      },
    },
    methods: {
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
          this.$emit("page-changed", page);
        }
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.changePage(this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.changePage(this.currentPage + 1);
        }
      },
    },
  };
  </script>
  