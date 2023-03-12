<template>
  <div>
    <TextH1 :text="'Hour registration'" />
    <input v-on:change="readExcel" type="file" id="input" />
    <table
      v-if="excelDataRowsFile"
      class="table-auto border-separate border-spacing-x-3 border-spacing-y-2"
    >
      <thead>
        <tr class="text-left font-semibold sticky top-0 bg-blackMain">
          <th>Dag</th>
          <th>Uren</th>
          <th>Projects</th>
          <th>Catergorie</th>
          <th>Evt. aanvullende beschrijving</th>
          <th>WBSO</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="values in excelDataRowsFile">
          <tr class="border-b border-dividerDark2">
            <td class="flex">
              <TextHashTag />
              <h3 class="font-semibold">
                Week {{ values[0].weekNumberBasedOnDate }}
              </h3>
            </td>
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <template v-for="value in values">
            <tr class="border-b border-dividerDark2">
              <td>{{ useDateDayMonthYear(value.date) }}</td>
              <td>{{ value.hours }}</td>
              <td>{{ value.project }}</td>
              <td>{{ value.type }}</td>
              <td>{{ value.description }}</td>
              <td>{{ value.wbsoHours }}</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ReadExcelType } from "~~/composables/useReadExcelFile";
async function readExcel() {
  const input = document.getElementById("input");
  if (input) {
    excelDataRowsFile.value = await useReadExcel(input);
  }
}
const excelDataRowsFile = ref<ReadExcelType>();
</script>
