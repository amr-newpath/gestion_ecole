<template>
  <div class="flex flex-col items-center mt-8">
    <h2 class="text-xl font-semibold mb-4">Edit User</h2>
    <form @submit.prevent="updateUser" class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-semibold mb-1">Name</label>
        <input type="text" id="name" v-model="editedUser.name" class="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200" />
      </div>
      <div class="mb-4">
        <label for="code" class="block text-gray-700 font-semibold mb-1">Code</label>
        <input type="text" id="code" v-model="editedUser.code" class="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200" />
      </div>

      <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring focus:ring-blue-200">
        Update User
      </button>
    </form>
  </div>
</template>

<script>
import axiosClient from '@/axios';
export default {
  data() {
    return {
      editedUser: {
        id: null,
        name: '',
        code: '',
      },
    };
  },
  methods: {
    fetchUser(id) {
      axiosClient
        .get(`/admin/get-user/${id}`) 
        .then((response) => {
          this.editedUser = response.data;
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    },
    updateUser() {
      axiosClient
        .put(`/admin/update-user/${this.editedUser.id}`, this.editedUser) 
        .then((response) => {
          console.log('User updated:', response.data);
          this.$router.push({ name: 'HomeAdmins' }); 
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    },
  },
  mounted() {
    const userId = this.$route.params.id;
    this.fetchUser(userId);
  },
};
</script>
