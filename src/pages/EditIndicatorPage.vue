<template>
    <PageHeader />
    <div class="form-data">
        <FormEditIndicator />
    </div>
</template>
  
<script>
import PageHeader from "@/components/PageHeader.vue";
import FormEditIndicator from "../components/FormEditIndicator.vue";

export default {
    name: "EditIdicatorPage",
    components: {
        FormEditIndicator,
        PageHeader
    },
};
</script>
  
<style scoped>
.form-data {
    margin: 20px 480px;
}
</style>