<template>
    <section class="py-1 bg-blueGray-50">
        <div class="w-full lg:w-9/12 px-4 mx-auto mt-6">
            <div class="bg-white p-3 mb-4 text-center">famille</div>
        </div>
        <ul class="mx-3" uk-accordion="multiple: true">
                <li class="uk-open">
                    <a class="uk-accordion-title pl-5 py-2 text-white" style="background-color: #0098ca;" href>Parents:</a>
                    <div class="uk-accordion-content">
                        <ParentComponents class="bg-white " :FamilleId="this.$route.params.id"/>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title pl-5 py-2 text-white" style="background-color: #0098ca;" href>Eleves:</a>
                    <div class="uk-accordion-content">
                        <ElevesComponents class="bg-white " :FamilleId="this.$route.params.id"/>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title pl-5 py-2 text-white" style="background-color: #0098ca;" href>Services:</a>
                    <div class="uk-accordion-content">
                        <SouscriptionComponent class="bg-white " :FamilleId="this.$route.params.id"/>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title pl-5 py-2 text-white" style="background-color: #0098ca;" href>Paiements:</a>
                    <div class="uk-accordion-content">
                        <ParentComponents class="bg-white " :FamilleId="this.$route.params.id"/>
                    </div>
                </li>
            </ul>
    </section>
</template>
  
<script>
import axiosClient from "../../../axios";
import ParentComponents from '@/components/parents/ParentsComponents.vue';
import ElevesComponents from '@/components/eleves/ElevesComponents.vue';
import SouscriptionComponent from '@/components/souscriptions/SouscriptionComponent.vue';
export default {
    components:{
        ParentComponents,
        ElevesComponents,
        SouscriptionComponent,
    },
    data() {
        return {
            family: null,
            nom_fammille: '',
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
                const response = await axiosClient.get("/administratif/familles/" + this.$route.params.id);
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
}</style>