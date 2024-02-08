<template>
    <div class="inp-icon">
        <img
        :src=getImgUrl(this.src)
        :width="this.width"
        :height="this.height"
        >
        <input
        :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="this.placeholder"
        :type="this.type"
        >
    </div>
</template>

<script>

export default {
    props: {
        type: String,
        placeholder: String,
        src: String,
        width: Number,
        height: Number,
        modelValue: String
    },
    
    methods: {
        getImgUrl: function (path) {
            let images = require.context('../assets/', false, /.png$|.jpg$/)
            return images("./" + path)
        },
    }

}
</script>

<style scoped>

.inp-icon{
    display: flex;
    padding-left: 10px;
    background-color: #ffffff;
    border: 1px solid;
    border-radius: 10px;
    border-color: #3D3C84;
    margin-bottom: 25px;    
}

input{
    outline: none;
    border: hidden;
    padding: 10px;
    font-size: 13pt;
    border-radius: 8px;
    margin-left: 5px;
    font-family: 'Century Gothic';
    width: 100%;
}

img{
    align-self: center;
}

</style>