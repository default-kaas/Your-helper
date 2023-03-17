<template>
  <div class="fixed left-12 py-3 px-6 border border-dividerDark2 rounded">
    <div class="flex py-1">
      <h2 class="font-semibold">Table of contents</h2>
    </div>
    <div class="flex py-1">
      <TextHashTag />
      <h3 class="font-semibold">Hour registration</h3>
    </div>
    <div class="flex py-1">
      <h2 class="font-semibold">Weeks:</h2>
    </div>
    <div
      v-for="weekNumber in Object.keys(excelDataRowsFile)"
      :key="weekNumber"
      class="flex py-1"
    >
      <TextHashTag />
      <h3 class="font-semibold">Week {{ weekNumber }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { hourRegestrationField } from "~~/composables/useReadExcelFile";
import { Dictionary } from "lodash";
defineProps({
  excelDataRowsFile: {
    type: Object as () => Dictionary<hourRegestrationField[]>,
    required: true,
  },
});
</script>
