<template>
    <PageHeader />
    <div class="form-data">
        <FormEditVariable />
    </div>
</template>
  
<script>
import PageHeader from "@/components/PageHeader.vue";
import FormEditVariable from "../components/FormEditVariable.vue";

export default {
    name: "EditVariablePage",
    components: {
        FormEditVariable,
        PageHeader
    },
};
</script>
  
<style scoped>
.form-data {
    margin: 20px 480px;
}
</style>