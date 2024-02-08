<template>
    <HeaderAdmin />
    <div class="form-data">
        <FormEditUser />
    </div>
</template>
  
<script>
import FormEditUser from "@/components/FormEditUser.vue";
import HeaderAdmin from "@/components/HeaderAdmin.vue";

export default {
    name: "PageHotelEdit",
    components: {
        FormEditUser,
        HeaderAdmin
    },
};
</script>
  
<style scoped>
.form-data {
    margin: 20px 480px;
}
</style>