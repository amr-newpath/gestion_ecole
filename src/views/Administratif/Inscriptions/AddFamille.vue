<template>
    <section class="py-1 bg-blueGray-50">
        <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div class="rounded-t bg-white mb-0 px-6 py-6">
                    <h1 class="text-blueGray-700 text-xl font-bold" style="font-size: 1.5em;">Ajouter Nouvelle Famille</h1>
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form method="post" @submit.prevent="add()">
                        <!-- Pere Form Fields -->
                        <div class="flex flex-wrap mt-5 mb-3  justify-center items-center">
                            <!-- ... rest of the form fields ... -->

                            <!-- Nom -->
                            <div class="w-75 lg:w-12/12 px-4 my-3">
                                <div class="relative w-full ">
                                    <label class="block uppercase text-blueGray-600 text-xl font-bold mb-2" for="pereNom">
                                        Nom
                                    </label>
                                    <input id="pereNom" type="text" placeholder="Nom" v-model="family.nom"
                                        class="block w-full py-3 text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                            </div>
                            <div class="w-75 lg:w-12/12 px-4 my-3">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xl font-bold mb-2"
                                        for="situation-des-familles">
                                        Situation des familles
                                    </label>
                                    <select id="situation-des-parents" v-model="family.situation"
                                        class="block w-full py-3 text-gray-900 border border-gray-300 rounded-lg bg-white-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="Marié">Marié</option>
                                        <option value="Divorcé">Divorcé</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-center items-center mb-5 mt-4">
                            <button type="button" @click="redirectTofamilles"
                                class="inline-block mr-2 rounded-full bg-primary px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                preview
                            </button>
                            <button type="submit" @click="add"
                                class="inline-block mr-3 rounded-full bg-info px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]">
                                next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axiosClient from "../../../axios";
export default {
    data() {
        return {
            family: {
                nom: '',
                situation: 'Marié',
            }
        }
    },
    mounted() {

    },
    methods: {
        redirectTofamilles() {
            this.$router.push({ name: 'EleveInscription' });
        },
        async add() {
            try {
                const response = await axiosClient.post("/administratif/familles", this.family);
                this.$router.push({ name: 'ParentInscription', params: { id: response.data.data.famille.id } });
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        }
    },
}
</script>
<style scoped></style>