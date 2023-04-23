<template>
  <aside class="fixed left-4 top-64 py-3 px-6 border border-dividerDark2 rounded">
    <div class="flex py-1">
      <h2 class="font-semibold">Table of contents</h2>
    </div>
    <a class="flex py-1">
      <TextHashTag />
      <a :href="'#Hour registration'" class="font-semibold"
        >Hour registration</a
      >
    </a>
    <div class="flex py-1">
      <h2 class="font-semibold">Weeks:</h2>
    </div>
    <a
      v-for="weekNumber in Object.keys(excelDataRowsFile)"
      :key="weekNumber"
      class="flex py-1"
      :href="`#week-${weekNumber}`"
    >
      <TextHashTag />
      <h3 class="font-semibold">Week {{ weekNumber }}</h3>
    </a>
  </aside>
</template>

<script setup lang="ts">
import { hourRegestrationFieldType } from "~~/composables/useReadExcelFile";
import { Dictionary } from "lodash";
defineProps({
  excelDataRowsFile: {
    type: Object as () => Dictionary<hourRegestrationFieldType[]>,
    required: true,
  },
});
</script>
