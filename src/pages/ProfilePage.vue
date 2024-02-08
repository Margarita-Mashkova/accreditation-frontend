<template>
    <HeaderAdmin />
    <div class="form-data">
        <FormProfile />
    </div>
</template>
  
<script>
import FormProfile from "@/components/FormProfile.vue";
import HeaderAdmin from "@/components/HeaderAdmin.vue";

export default {
    name: "ProfilePage",
    components: {
        HeaderAdmin,
        FormProfile
    },
};
</script>
  
<style scoped>
.form-data {
    margin: 25px 500px;
}
</style>