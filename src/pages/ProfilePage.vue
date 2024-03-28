<template>
    <PageHeader />
    <div class="form-data">
        <FormProfile />
    </div>
</template>
  
<script>
import FormProfile from "@/components/FormProfile.vue";
import PageHeader from "@/components/PageHeader.vue";

export default {
    name: "ProfilePage",
    components: {
        PageHeader,
        FormProfile
    },
};
</script>
  
<style scoped>
.form-data {
    margin: 25px 500px;
}
</style>