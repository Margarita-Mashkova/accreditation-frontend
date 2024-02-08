<template>
  <router-view />
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Century Gothic";
  color: whitesmoke;
}

li a:hover {
  color: #28275c;
}

a{
    text-decoration: none;
    color: whitesmoke;
}

html,
body {
  background-color: white;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

h4{
    color: black;
    font-size: 20pt;
    align-self: center;
    font-family: "Century Gothic";
    margin-bottom: 10px;
}

.btn-simple:hover {
  background-color: #28275c;
}

.btn-simple-edit:hover {
  background-color: #f3bf03;
}

.btn-simple-delete:hover {
  background-color: #e91d02;
}

.btn-simple {
  font-family: "Century Gothic";
  padding: 10px 20px;
  color: white;
  border-radius: 10px;
  background-color: #3D3C84;
  border: 1px solid;
  border-color: #3D3C84;
  text-align: center;
  cursor: pointer;
  font-size: 11pt;
  width: 100%;
}

.btn-simple-edit {
  font-family: "Century Gothic";
  padding: 8px 10px;
  color: white;
  border-radius: 10px;
  background-color: #FFC700;
  border: none;
  text-align: center;
  cursor: pointer;
  font-size: 10pt;
  margin-right: 5px;
}

.btn-simple-delete {
  font-family: "Century Gothic";
  padding: 8px 10px;
  color: white;
  border-radius: 10px;
  background-color: #FF1F00;
  border: none;
  text-align: center;
  cursor: pointer;
  font-size: 10pt;
}

</style>
