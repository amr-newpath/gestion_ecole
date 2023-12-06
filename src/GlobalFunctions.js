import axiosClient from "./axios";
import Swal from "sweetalert2";

const removeIteme = async (
  id,
  title,
  url,
  arr,
) => {
  console.log("delete" + id);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: title,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn bg-danger  text-white",
        cancelButton: "btn bg-primary mr-5 text-white",
      },
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        console.log(arr);
        // arr = [];
        // if (typeof additionalArgs === "function") {
        //   additionalArgs();
        // }
        // try {
        //   const res = await axiosClient.delete(url + id);
        //   console.log(res.data);
        // } catch (error) {
        //   console.error("Error fetching parents:", error);
        // }
        swalWithBootstrapButtons
          .fire("Deleted!", "Your file has been deleted.", "success")
          .then((result) => {
            if (result.isConfirmed) {
            }
          });
      } else if (
        /* Read more about handling dismissals below */

        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    });
};

export default removeIteme;
