<template>
    <section class="py-1 bg-blueGray-50">
        <div class="w-full lg:w-9/12 px-4 mx-auto mt-6">
            <div class="row mt-8 bg-white py-5 rounded">
                <h5 class="text-blueGray-700 text-xl font-bold" style="margin-left:2rem;">Nom Famille: {{ nom_fammille }}
                </h5>
            </div>
            <div class="row mt-8">
                <div class="flexbetween">
                    <h6 class="text-blueGray-700 text-xl font-bold">Parents :</h6>
                    <h6 class="text-blueGray-700 text-xl font-bold">
                        <router-link :to="{ name: 'AddParent' }">
                            <i class="bi bi-person-plus-fill"></i>
                        </router-link>
                    </h6>
                </div>
                <div class="flex items-center my-4">
                    <div class="flex items-center my-4 bg-white p-4 rounded" style="margin-left: -4px;"
                        v-for="(parent, index) in parents" :key="index">
                        <img class="rounded-full" :src="'' + parent.image.path" width="120" height="80" alt="Avatar">
                        <div class="ml-2 items-center">
                            <div class="ml-2 items-center">{{ parent.nom }} {{ parent.prenom }}</div>
                        </div>
                        <div class="ml-2 items-center my-3 ml-3">
                            <div class="btn-group ml-5" role="group">
                                <div class="btn btn-info  rounded-circle  mr-1 ml-9">
                                    <i class="bi bi-info-lg text-white"></i>
                                </div>
                                <div class="btn btn-warning  rounded-circle mr-1">
                                    <i class="bi bi-brush-fill  text-white"></i>
                                </div>
                                <div class="btn btn-danger  rounded-circle">
                                    <i class="bi bi-trash3-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-8">
                <div class="flexbetween">
                    <h6 class="text-blueGray-700 text-xl font-bold">Eleves :</h6>
                    <h6 class="text-blueGray-700 text-xl font-bold">
                        <router-link :to="{ name: 'EleveInscription' }">
                            <i class="bi bi-person-plus-fill"></i>
                        </router-link>
                    </h6>
                </div>
                <div class="flex items-center my-4">
                    <div class="flex items-center my-4 bg-white p-4 rounded" style="margin-left: -4px;"
                        v-for="(eleve, index) in eleves" :key="index">
                        <img class="rounded-full" :src="'' + eleve.image.path" width="120" height="80" alt="Avatar">
                        <div class="ml-2 items-center">
                            <div class="ml-2 items-center">{{ eleve.nom }} {{ eleve.prenom }}</div>
                            <div class="ml-2 items-center">{{ niveau }}</div>
                        </div>
                        <div class="ml-2 items-center my-3 ml-3">
                            <div class="btn btn-info  rounded-circle  mr-1 ml-9">
                                <i class="bi bi-info-lg text-white"></i>
                            </div>
                            <div class="btn btn-warning  rounded-circle mr-1">
                                <i class="bi bi-brush-fill  text-white"></i>
                            </div>
                            <div class="btn btn-danger  rounded-circle">
                                <i class="bi bi-trash3-fill"></i>
                            </div>
                        </div>
                    </div>
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
            family: null,
            nom_fammille: '',
            famille_id: null,
            parents: null,
            eleves: null,
        }
    },
    mounted() {
        this.getFamilly();
    },
    methods: {
        async getFamilly() {
            try {
                const response = await axiosClient.get("/administratif/familles/" + this.famille_id);
                if (response.data != null) {
                    this.family = response.data;
                    this.nom_fammille = this.family.nom;
                    this.parents = this.family.parente;
                    this.eleves = this.family.eleves;
                }
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        }
    },
    created() {
        // Access the route parameter and handle null
        const routeParams = this.$route.params;
        if (routeParams.id) {
            this.famille_id = routeParams.id; // Update the userId property
        }
    },
}
</script>
<style scoped>
.flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.flexbetween {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.items-center {
    align-items: center;
}

.btn-group {
    display: flex;
}

.btn-check {
    display: none;
}

.btn-check+.btn {
    margin-left: 5px;
}

@media (max-width: 768px) {
    .row {
        flex-direction: column;
    }
}

@media (max-width: 576px) {
    .w-full {
        width: 100%;
    }

    .mx-auto {
        margin-left: auto;
        margin-right: auto;
    }

    .mt-8,
    .my-4 {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
}
</style>