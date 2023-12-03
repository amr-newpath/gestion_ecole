<template>
    <section class="py-1 bg-blueGray-50">
        <div class="w-full lg:w-9/12 px-4 mx-auto mt-6">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div class="rounded-t bg-white mb-0 px-6 py-6">
                    <div class="text-center flex justify-between">
                        <h6 class="text-blueGray-700 text-xl font-bold">Edit Parents</h6>
                    </div>
                </div>
                <form method="post" @submit.prevent="update" class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div class="row  mt-5">
                        <div class="col-lg-3 my-3">
                            <!-- upload image -->
                            <div class="flex items-center justify-center w-full mt-3 mb-4">
                                <label for="dropzone-file" v-if="!parent.image"
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
                                <img v-if="parent.image" :src="imgreload(parent.image)"  id="img" alt="Uploaded Image" @click="test"
                                    style="border-radius: 8em;width: 5em;height: 5em;display: flex;justify-content: center;align-items: center;"
                                    class="my-3" />
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="civilite"
                                        class="block text-sm font-medium text-gray-600 mb-2">Civilite</label>
                                    <select v-model="parent.civilite"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="masculin">masculin</option>
                                        <option value="féminin">féminin</option>
                                    </select>
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="nom" class="block text-sm font-medium text-gray-600 mb-2">Nom</label>
                                    <input type="text" id="nom" v-model="parent.nom"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Nom" />
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="prenom" class="block text-sm font-medium text-gray-600 mb-2">Prénom</label>
                                    <input type="text" id="prenom" v-model="parent.prenom"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Prénom" />
                                </div>

                                <!-- Add similar classes for other input fields -->
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2 sm:px-3">
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="profession"
                                        class="block text-sm font-medium text-gray-600 mb-2">Profession</label>
                                    <input type="text" id="profession" v-model="parent.profession"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Profession" />
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="country"
                                        class="block text-sm font-medium text-gray-600 mb-2">Nationalité</label>
                                    <select v-model="parent.nat"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option v-for="nationality in nationalities" :key="nationality"
                                            :value="nationality">
                                            {{ nationality }}
                                        </option>
                                    </select>
                                </div>
                                <div class="w-full px-3 mb-4 sm:w-1/3">
                                    <label for="genre" class="block text-sm font-medium text-gray-600 mb-2">Lien De
                                        Parente</label>
                                    <select v-model="parent.liendeparente_id"
                                        class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option v-for="linedeparente in linedeparentes" :key="linedeparente.id"
                                            :value="linedeparente.id">{{ linedeparente.type }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <ul
                            class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4">
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div class="flex items-center pl-3">
                                    <input id="vue-checkbox-list" type="checkbox" v-model="parent.authorisationderecup"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="vue-checkbox-list"
                                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Autorisation
                                        de Récupération</label>
                                </div>
                            </li>
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div class="flex items-center pl-3">
                                    <input id="react-checkbox-list" type="checkbox" v-model="parent.responsablelegale"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="react-checkbox-list"
                                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Responsable
                                        Légale</label>
                                </div>
                            </li>
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div class="flex items-center pl-3">
                                    <input id="angular-checkbox-list" type="checkbox" v-model="parent.Gardelegale"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="angular-checkbox-list"
                                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Garde
                                        Légale</label>
                                </div>
                            </li>
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div class="flex items-center pl-3">
                                    <input id="angular-checkbox-list" type="checkbox" v-model="parent.payeur"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="angular-checkbox-list"
                                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Payeur</label>
                                </div>
                            </li>
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div class="flex items-center pl-3">
                                    <input id="angular-checkbox-list" type="checkbox" v-model="parent.contacturgence"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="angular-checkbox-list"
                                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Contact
                                        d'Urgence</label>
                                </div>
                            </li>
                        </ul>
                        <div class="flex flex-wrap -mx-3 mb-2 sm:px-3 mt-3">
                            <div class="w-full px-3 mb-4 sm:w-1/4">
                                <label for="email" class="block text-sm font-medium text-gray-600 mb-2">Email</label>
                                <input type="text" id="email" v-model="parent.email"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="email" />
                            </div>
                            <div class="w-full px-3 mb-4 sm:w-1/4">
                                <label for="telephone" class="block text-sm font-medium text-gray-600 mb-2">Telephone
                                    1</label>
                                <input type="text" id="telephone" v-model="parent.tel"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="telephone" />
                            </div>
                            <div class="w-full px-3 mb-4 sm:w-1/4">
                                <label for="telephone" class="block text-sm font-medium text-gray-600 mb-2">Telephone
                                    2</label>
                                <input type="text" id="telephone" v-model="parent.phone"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="telephone" />
                            </div>
                            <div class="w-full px-3 mb-4 sm:w-1/4">
                                <label for="genre" class="block text-sm font-medium text-gray-600 mb-2">Genre</label>
                                <select v-model="parent.genre"
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Choose a Genre</option>
                                    <option value="femme">Femme</option>
                                    <option value="homme">Homme</option>
                                </select>
                            </div>
                            <div class="w-full px-3 mb-4 sm:w-3/3">
                                <label for="genre" class="block text-sm font-medium text-gray-600 mb-2">Adresse</label>
                                <textarea
                                    class="block w-full text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    v-model="parent.adresse" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end items-center mb-5 mt-4">
                        <button type="button" @click="redirecttoparent()"
                            class="inline-block mr-2 rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            annuelle
                        </button>
                        <button type="submit" @click="add"
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
import $ from 'jquery';
import axiosClient from "../../../axios";
export default {
    data() {
        return {
            parent: {
                nom: "",
                prenom: "",
                profession: "",
                nat: "Morocco",
                email: "",
                phone: "",
                tel: "",
                adresse: "",
                civilite: "masculin",
                genre: "homme",
                authorisationderecup: null,
                responsablelegale: null,
                Gardelegale: null,
                payeur: null,
                contacturgence: null,
                image: "",
                liendeparente_id: 1,
                famille_id: null,
            },
            linedeparentes: [],
            nationalities: [],
        };
    },
    mounted() {
        this.getLinedeParents();
        this.getNationalities();
        this.edit();
    },
    methods: {
        // imgreload(path) {
        //     console.log($("#img").attrs("src"));
        //     return '@/assets/images/image_1698072357.png';
        // },
        async edit() {
            try {
                const response = await axiosClient.get(
                    "/administratif/parentes/" + this.$route.params.idP
                );
                this.parent = response.data;
                if (this.parent.authorisationderecup == 1) {
                    this.parent.authorisationderecup = true;
                } else {
                    this.parent.authorisationderecup = false;
                }
                if (this.parent.Gardelegale == 1) {
                    this.parent.Gardelegale = true;
                } else {
                    this.parent.Gardelegale = false;
                }
                if (this.parent.payeur == 1) {
                    this.parent.payeur = true;
                } else {
                    this.parent.payeur = false;
                }
                if (this.parent.contacturgence == 1) {
                    this.parent.contacturgence = true;
                } else {
                    this.parent.contacturgence = false;
                }
                if (this.parent.responsablelegale == 1) {
                    this.parent.responsablelegale = true;
                } else {
                    this.parent.responsablelegale = false;
                }
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        },
        redirecttoparent() {
            this.$router.push({ name: 'ParentInscription', params: { id: this.$route.params.id } })
        },
        test() {
            this.parent.image = "";
        },
        openImageUploader() {
            // Access the file input directly using the ref
            this.$refs.imageInput.click();
        },
        handleImageUpload(event) {
            const file = event.target.files[0];

            if (file) {
                // You can display the uploaded image, for example:
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.parent.image = e.target.result;
                };
                reader.readAsDataURL(file);

                // You can also handle the file upload here and send it to your server if needed.
            }
        },
        async getLinedeParents() {
            try {
                const response = await axiosClient.get(
                    "/administratif/linedeparentes",
                );
                this.linedeparentes = response.data;
            } catch (error) {
                console.error("Error fetching line de parentes:", error);
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
            } catch (error) {
                console.error("Error fetching nationalities:", error);
            }
        },
        async update() {
            try {
                const response = await axiosClient.put(
                    "/administratif/parentes/" + this.$route.params.idP,
                    this.parent
                );
                this.$router.push({ name: 'ParentInscription', params: { id: this.$route.params.id } });
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        },
    },
    created() {
        const routeParams = this.$route.params;
        if (routeParams.id) {
            this.parent.famille_id = routeParams.id;
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
