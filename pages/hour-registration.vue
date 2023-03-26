<template>
  <div>
    <TextH1 :text="'Hour registration'" />
    <input v-on:change="readExcel" type="file" id="input" />
    <template v-if="excelDataRowsFile">
      <viewWeek :excelDataRowsFile="excelDataRowsFile" />
      <viewHour v-if="tempResult" :excelDataRowsFile="tempResult" />
      <table class="table-auto border-collapse">
        <thead>
          <tr class="text-left font-semibold sticky top-0 bg-blackMain">
            <th class="py-2 px-3 border-b border-dividerDark2">Dag</th>
            <th class="pr-3 border-b border-dividerDark2">Uren</th>
            <th class="pr-3">Projects</th>
            <th class="pr-3">Categorie</th>
            <th class="pr-3">Evt. aanvullende beschrijving</th>
            <th class="pr-3">WBSO</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="values in excelDataRowsFile">
            <tr :id="`week-${values[0].weekNumberBasedOnDate}`">
              <td class="pl-3 pt-1 py-2 border-t border-dividerDark2">
                <div class="flex">
                  <TextHashTag />
                  <h3 class="font-semibold">
                    Week {{ values[0].weekNumberBasedOnDate }}
                  </h3>
                </div>
              </td>
              <td class="pt-1 py-1 border-t border-dividerDark2" />
              <td class="pt-1 py-1 border-t border-dividerDark2" />
              <td class="pt-1 py-1 border-t border-dividerDark2" />
              <td class="pt-1 py-1 border-t border-dividerDark2" />
              <td class="pt-1 py-1 border-t border-dividerDark2" />
            </tr>
            <template v-for="value in values">
              <tr>
                <td class="pl-3 py-2 px-2">
                  {{ useDateDayMonthYear(value.date) }}
                </td>
                <td class="px-2 text-right">{{ value.hours }}</td>
                <td class="px-2">{{ value.project }}</td>
                <td class="px-2">{{ value.type }}</td>
                <td class="px-2">{{ value.description }}</td>
                <td class="px-2">{{ value.wbsoHours }}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  hourRegestrationField,
  ReadExcelType,
} from "~~/composables/useReadExcelFile";
async function readExcel() {
  const input = document.getElementById("input");
  if (input) {
    const result = await useReadExcel(input);
    if (result) {
      tempResult.value = result;
      excelDataRowsFile.value = useGroupedByWeekNumber(result);
    }
  }
}
const tempResult = ref<hourRegestrationField[] | null>();
const excelDataRowsFile = ref<ReadExcelType>();
</script>

<style>
html {
  scroll-behavior: smooth;
  scroll-padding-top: 35px;
}
</style>
