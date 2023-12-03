<template>
    <section class="py-1 bg-blueGray-50">
        <div class="w-full lg:w-9/12 px-4 mx-auto mt-6">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div class="rounded-t bg-white mb-0 px-6 py-6">
                    <div class="text-center flex justify-between">
                        <h6 class="text-blueGray-700 text-xl font-bold">Ajouter Eleve</h6>
                    </div>
                </div>
                <form method="post" @submit.prevent="add()" class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div class="row  mt-5">
                        <div class="col-lg-3 my-3">
                            <!-- upload image -->
                            <div class="flex items-center justify-center w-full mt-3 mb-4">
                                <label for="dropzone-file" v-if="!eleve.image"
                                    style="border-radius: 8em;width: 5em;height: 5em;display: flex;justify-content: center;align-items: center;"
                                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                    </div>
                                    <input id="dropzone-file" type="file" accept="image/*" ref="imageInput"
                                        @change="handleImageUpload" class="hidden" />
                                </label>
                                <img v-if="eleve.image" :src="eleve.image" alt="Uploaded Image" @click="test"
                                    style="border-radius: 8em;width: 5em;height: 5em;display: flex;justify-content: center;align-items: center;"
                                    class="my-3" />
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="code" class="block text-sm font-medium text-gray-600 mb-2">Code</label>
                                    <input type="text" id="code" v-model="eleve.code"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="code" />
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="nom" class="block text-sm font-medium text-gray-600 mb-2">Nom</label>
                                    <input type="text" id="nom" v-model="eleve.nom"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Nom" />
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="prenom" class="block text-sm font-medium text-gray-600 mb-2">Prénom</label>
                                    <input type="text" id="prenom" v-model="eleve.prenom"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Prénom" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="date_naissance" class="block text-sm font-medium text-gray-600 mb-2">date
                                        naissance</label>

                                    <input id="date_naissance" type="date" v-model="eleve.date_naissance"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="country"
                                        class="block text-sm font-medium text-gray-600 mb-2">Nationalité</label>
                                    <select v-model="eleve.nat"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option v-for="nationality in nationalities" :key="nationality"
                                            :value="nationality">
                                            {{ nationality }}
                                        </option>
                                    </select>
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="genre" class="block text-sm font-medium text-gray-600 mb-2">Genre</label>
                                    <select v-model="eleve.sexe"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Choose a Genre</option>
                                        <option value="femme">Femme</option>
                                        <option value="homme">Homme</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                        <div class="w-full px-3 mb-4 sm:w-1/4">
                            <label for="etab_pre" class="block text-sm font-medium text-gray-600 mb-2">établissement
                                précédente</label>
                            <select v-model="eleve.etab_pre"
                                class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option v-for="nationality in nationalities" :key="nationality" :value="nationality">
                                    {{ nationality }}
                                </option>
                            </select>
                        </div>
                        <div class="w-full px-3 mb-4 sm:w-1/4">
                            <label for="annee_scolaire" class="block text-sm font-medium text-gray-600 mb-2">Année
                                Scolaire</label>
                            <select v-model="eleve.annee_scolaire"
                                class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option v-for="(nationality, index) in yearOptions" :key="index" :value="nationality">
                                    {{ nationality }}
                                </option>
                            </select>
                        </div>
                        <div class="w-full px-3 mb-4 sm:w-1/4">
                            <label for="niveau" class="block text-sm font-medium text-gray-600 mb-2">niveau</label>
                            <select v-model="eleve.niveau"
                                class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Choose a niveau</option>
                                <option value="femme">Femme</option>
                                <option value="homme">Homme</option>
                            </select>
                        </div>
                        <div class="w-full px-3 mb-4 sm:w-1/4">
                            <label for="anciennete" class="block text-sm font-medium text-gray-600 mb-2">anciennete</label>
                            <input type="number" id="anciennete" v-model="eleve.anciennete"
                                class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="anciennete" />
                        </div>
                    </div>


                    <div class="flex justify-end items-center mb-5 mt-4">
                        <button type="button" @click="redirectToeleves()"
                            class="inline-block mr-2 rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            annuelle
                        </button>
                        <button type="submit"
                            class="inline-block mr-3 rounded-full bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]">
                            next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
import axiosClient from "../../../axios";
export default {
    data() {
        return {
            eleve: {
                code: "",
                nom: "",
                prenom: "",
                date_naissance: null,
                nat: "Morocco",
                sexe: "homme",
                etab_pre: null,
                annee_scolaire: null,
                niveau: null,
                famille_id: null,
                image: "",
                anciennete: null,
            },
            yearOptions: ["2023/2024", "2024/2025", "2025/2026", "2026/2027"],
            nationalities: [],
        };
    },
    mounted() {
        this.getNationalities();
    },
    methods: {
        redirectToeleves() {
            this.$router.push({ name: 'ElevesInscription', params: { id: this.$route.params.id } })
        },
        test() {
            this.eleve.image = "";
        },
        openImageUploader() {
            this.$refs.imageInput.click();
        },
        handleImageUpload(event) {
            const file = event.target.files[0];

            if (file) {
                // You can display the uploaded image, for example:
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.eleve.image = e.target.result;
                };
                reader.readAsDataURL(file);

                // You can also handle the file upload here and send it to your server if needed.
            }
        },
        async getNationalities() {
            try {
                const response = await axiosClient.get(
                    "https://restcountries.com/v3/all"
                );
                this.nationalities = response.data.map(
                    (country) => country.name.common
                );
                console.log();
            } catch (error) {
                console.error("Error fetching nationalities:", error);
            }
        },
        async add() {
            try {
                const response = await axiosClient.post("/administratif/elevess/createacount", this.eleve);
                console.log(response.data);
                this.$router.push({ name: 'ElevesInscription', params: { id: this.$route.params.id } });
            } catch (error) {
                console.error("Error fetching eleves:", error);
            }
        },
    },
    created() {
        const routeParams = this.$route.params;
        if (routeParams.id) {
            this.eleve.famille_id = routeParams.id;
        }
    },
};
</script>
<style scoped>
.dspc {
    display: flex;
    justify-content: end;
}
</style>
