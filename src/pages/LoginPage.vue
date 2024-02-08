<template>
    <div class="form-position">
        <FormLogin />
    </div>
</template>
  
<script>
import FormLogin from "@/components/FormLogin.vue";

export default {
    name: "LoginPage",
    components: {
        FormLogin,
    },
};
</script>
  
<style scoped>
.form-position {
    left: 50%;
    top: 40%;
    position: absolute;
    transform: translate(-50%, -50%);
    width: 30%;
}
</style>