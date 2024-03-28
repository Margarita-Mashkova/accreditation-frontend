<template>
    <PageHeader />
    <div class="form-data">
        <FormEditUser />
    </div>
</template>
  
<script>
import FormEditUser from "@/components/FormEditUser.vue";
import PageHeader from "@/components/PageHeader.vue";

export default {
    name: "EditUserPage",
    components: {
        FormEditUser,
        PageHeader
    },
};
</script>
  
<style scoped>
.form-data {
    margin: 20px 480px;
}
</style>