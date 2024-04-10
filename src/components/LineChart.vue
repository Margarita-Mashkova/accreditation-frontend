<template>
    <Line :options="this.options" :data="this.data" />
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

export default {
    name: 'LineChart',
    components: { Line },
    props: {
        options: Array,
        data: Array
    }
}
</script>