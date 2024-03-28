<template>
    <PageHeader />
    <div class="form-data">
        <FormEditOpop />
    </div>
</template>
  
<script>
import FormEditOpop from "@/components/FormEditOpop.vue";
import PageHeader from "@/components/PageHeader.vue";

export default {
    name: "EditOpopPage",
    components: {
        FormEditOpop,
        PageHeader
    },
};
</script>
  
<style scoped>
.form-data {
    margin: 20px 480px;
}
</style>