<template>
    <v-main>
        <v-row align="center" class="h-100" no-gutters>
            <v-col cols="7" class="pa-8">
                <span class="text-subtitle-2">LOADING...</span>
                <v-progress-linear indeterminate color="primary"/>
            </v-col>
            <v-col cols="5" align-self="stretch" class="flex-grow-0 pt-8">
                <v-card height="100%" rounded="0 ts-xl" elevation="6">
                    <v-img src="@/assets/images/loading-card-image.jpg" cover class="h-100"/>
                </v-card>
            </v-col>
        </v-row>
    </v-main>
</template>

<script lang="ts" setup>
    import {useRouter} from 'vue-router';
    import {MaintenanceRouteNames} from '@/router/constants';
    import {onMounted} from 'vue';

    const router = useRouter();

    onMounted(() => {
        setTimeout(() => {
            router.push({
                name: MaintenanceRouteNames.MAINTENANCE
            });
        }, 3000);
    });
</script>
