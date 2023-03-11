<template>
  <div>
    <!-- <h1 class="text-textDark1">Excel reader test</h1> -->
    <TextH1 :text="'Hour registration'" />
    <input v-on:change="readExcel" type="file" id="input" />
    <table class="table-auto border-separate border-spacing-2">
      <template v-for="excelDataRow in excelDataRowsFile">
        <!-- test
        {{ excelDataRow }}
        {{ isTitleField(excelDataRow) }}
        {{ isHourRegestrationField(excelDataRow) }} -->
        <thead v-if="useIsTitleField(excelDataRow)">
          <tr>
            <th>{{ excelDataRow.dayTitle }}</th>
            <th>{{ excelDataRow.hoursTitle }}</th>
            <th>{{ excelDataRow.projectTitle }}</th>
            <th>{{ excelDataRow.categorieTitle }}</th>
            <th>{{ excelDataRow.descriptionTitle }}</th>
            <th>{{ excelDataRow.wbsoHoursTitle }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="useIsHourRegestrationField(excelDataRow)">
            <td>{{ useDateDayMonthYear(excelDataRow.date) }}</td>
            <td>{{ excelDataRow.hours }}</td>
            <td>{{ excelDataRow.project }}</td>
            <td>{{ excelDataRow.type }}</td>
            <td>{{ excelDataRow.description }}</td>
            <td>{{ excelDataRow.wbsoHours }}</td>
          </tr>
        </tbody>
      </template>
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
