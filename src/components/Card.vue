<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Card"
};
</script>

<style>
.card {
  background-color: #fff;
  padding: 2em;
  border-radius: 0.4em;
  margin-bottom: 1em;
}
</style>
