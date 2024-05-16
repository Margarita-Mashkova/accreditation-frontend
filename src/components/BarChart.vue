<template>
    <Bar :options="this.options" :data="this.data" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        options: Array,
        data: Array
    }
}
</script>