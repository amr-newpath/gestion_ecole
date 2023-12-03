<template>
    <section class="py-1 bg-blueGray-50">
        <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div class="rounded-t bg-white mb-0 px-6 py-6">
                    <div class="text-center flex justify-between">
                        <h6 class="text-blueGray-700 text-xl font-bold">Modifier Famille</h6>
                    </div>
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form method="post" @submit.prevent="update()">
                        <!-- Pere Form Fields -->
                        <div class="flex flex-wrap mt-5 mb-3">
                            <!-- ... rest of the form fields ... -->

                            <!-- Nom -->
                            <div class="w-full lg:w-6/12 px-4 my-3">
                                <div class="relative w-full ">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="pereNom">
                                        Nom
                                    </label>
                                    <input id="pereNom" type="text" placeholder="Nom" v-model="family.nom"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 my-3">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="situation-des-familles">
                                        Situation des familles
                                    </label>
                                    <select id="situation-des-parents" v-model="family.situation"
                                        class="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                        <option value="Marié">Marié</option>
                                        <option value="Divorcé">Divorcé</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="w-full px-4">
                            <div class="w-full mb-3 items-center">
                                <input type="submit" class="btn btn-warning bg-warning px-5 py-3 my-2 w-100" value="Modifier">
                            </div>
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
                situation: '',
            },
            famille_id: null,
        }
    },
    mounted() {
        this.edit();
    },
    methods: {
        async edit(){
            try {
                const respons = await axiosClient.get("/administratif/familles/"+ this.famille_id);
                this.family.nom = respons.data.nom;
                this.family.situation = respons.data.situation;
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        },
        async update(){
            try {
                const response = await axiosClient.put("/administratif/familles/"+ this.famille_id, this.family);
                this.$router.push({name: 'EleveInscription'});
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        }
    },
    created() {
        const routeParams = this.$route.params;
        if (routeParams.id) {
            this.famille_id = routeParams.id;
        }
    },
}
</script>
<style scoped></style>