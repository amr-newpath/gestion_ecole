<template>
  <div>
    <div class="dropzone" ref="imageDropzone"></div>
  </div>
</template>

<script>
import Dropzone from "dropzone";

export default {
  mounted() {
    // Initialize Dropzone
    const dropzoneElement = this.$refs.imageDropzone;

    const myDropzone = new Dropzone(dropzoneElement, {
      url: "/upload-image", // Your image upload URL
      acceptedFiles: "image/*",
      addRemoveLinks: true,
      maxFiles: 1, // Limit to one file
      init() {
        // Handle when an image is added
        this.on("addedfile", (file) => {
          // You can add custom logic here if needed
        });

        // Handle when an image is removed
        this.on("removedfile", (file) => {
          // You can add custom logic here if needed
        });

        // Handle when an image is successfully uploaded
        this.on("success", (file, response) => {
          // Emit an event with the uploaded image URL
          this.$emit("image-uploaded", response.imageUrl); // Change 'imageUrl' to match your API response
        });
      },
    });
  },
};
</script>
