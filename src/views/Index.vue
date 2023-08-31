<script setup>
import PageWrapper from '@/components/PageWrapper.vue'
import StatisticsSection from '@/components/pages/dashboard/StatisticsSection.vue'
import SalesSection from '@/components/pages/dashboard/SalesSection.vue'
import LatestSection from '@/components/pages/dashboard/LatestSection.vue'
import ElevesServices from '@/components/pages/dashboard/ElevesServices.vue'

import Button from '@/components/Button.vue'
import { useStore } from 'vuex'


// const store = useStore()

// console.log(store.);

</script>

<template>
    <PageWrapper>
        <template #header>
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 class="text-xl font-semibold leading-tight">Dashboard</h2>
            </div>
        </template>

        <!-- Statistics section -->
        <!-- <StatisticsSection /> -->

        <SalesSection />
        <ElevesServices />
        
        <!-- Sales section -->
        

        <!-- Latest users & transaction section -->
        <!-- <LatestSection /> -->
    </PageWrapper>
</template> 
