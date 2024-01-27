<script setup>
const props = defineProps(["title", "id", "tags"]);

let lid = "/run/" + props.id;
</script>
<template>
  <a style="display: block" :href="lid">
    <div class="bprimary card">
      <h5 style="margin-left: 10px; margin-top: 10px">{{ title }}</h5>
      <p class="baccent tag" v-for="tag in props.tags">{{ tag }}</p>
    </div>
  </a>
</template>
