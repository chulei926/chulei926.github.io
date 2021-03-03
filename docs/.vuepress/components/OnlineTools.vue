<template>
  <div class="container">
    <div class="tool"></div>
    <div class="tool"></div>
    <div class="tool"></div>
    <div class="tool"></div>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid red;
  flex-direction: row;
  align-items: center;
  align-content: space-between;
  justify-content: space-between;
}

.container .tool {
  width: 100px;
  height: 100px;
  background-color: brown;
}
</style>
 