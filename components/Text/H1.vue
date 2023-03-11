<template>
  <h1 :id="text" class="text-4xl flex font-semibold">
    <TextHashTag />
    {{ text }}
  </h1>
  <TextDivider2 />
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
