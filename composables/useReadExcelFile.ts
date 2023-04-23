// https://www.npmjs.com/package/read-excel-file
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear"
import readXlsxFile from "read-excel-file";
import { Dictionary } from "lodash";
dayjs.extend(weekOfYear)

export type hourRegestrationFieldType = {
  typeOfField: string;
  date: Date;
  weekNumberBasedOnDate: number;
  hours: number;
  project: string;
  type: string;
  description: string;
  wbsoHours: number;
};

export type readExcelType = null | Dictionary<hourRegestrationFieldType[]>

export type caclulateHoursType = Map<string,number> | null

//#region Read excel
export async function useReadExcel(input: HTMLElement) {
  if (input?.files) {
    const result = await readXlsxFile(input?.files[0]).then((rows) => {
      const parsedResult = rows.map((row) => {        
        if (row[1] !== null && typeof row[1] ===  'number') {
          return {
            typeOfField: 'hourRegestrationFieldType',
            date: row[0] as unknown as Date,
            weekNumberBasedOnDate: dayjs(row[0] as unknown as Date).week(),
            hours: row[1] as number,
            project: row[2] as string,
            type: row[3] as string,
            description: row[4] as string,
            wbsoHours: row[5] as number,
          } as hourRegestrationFieldType;
        }
        return undefined;
      }) as
        | [hourRegestrationFieldType | undefined]
        | null
      return parsedResult
    });
    return result?.filter(row => row) as [hourRegestrationFieldType]
  }
  return null
}
//#endregion

//#region Grouped by
export function useGroupedByWeekNumber(onlyHourRegestrationFields: hourRegestrationFieldType[]){
  return useGroupBy(onlyHourRegestrationFields, row => row.weekNumberBasedOnDate)
}
export function useGroupedByProject(onlyHourRegestrationFields: hourRegestrationFieldType[]){
  return useGroupBy(onlyHourRegestrationFields, row => row.project)
}
export function useGroupedByType(onlyHourRegestrationFields: hourRegestrationFieldType[]){
  return useGroupBy(onlyHourRegestrationFields, row => row.type)
}
//#endregion

//#region Calculate hours
export function useCalculateTotalHours(onlyHourRegestrationFields: hourRegestrationFieldType[]){
  let totalHours = 0;
  for (let i = 0; i < onlyHourRegestrationFields.length; i++){
    if(onlyHourRegestrationFields[i].hours){
      totalHours += onlyHourRegestrationFields[i].hours
    }
  }
  return totalHours
}
export function useCalculateWBSOHours(onlyHourRegestrationFields: hourRegestrationFieldType[]){
  let totalWBSOHours = 0;
  for (let i = 0; i < onlyHourRegestrationFields.length; i++){
    if(onlyHourRegestrationFields[i].wbsoHours){
      totalWBSOHours += onlyHourRegestrationFields[i].wbsoHours
    }
  }
  return totalWBSOHours
}
export function useCalculateProjectHours(onlyHourRegestrationFields: hourRegestrationFieldType[]){
  const projectHours = new Map<string,number>();
  for (let i = 0; i < onlyHourRegestrationFields.length; i++){
    if(onlyHourRegestrationFields[i].project && onlyHourRegestrationFields[i].hours){
      if(!projectHours.has(onlyHourRegestrationFields[i].project)){
        projectHours.set(onlyHourRegestrationFields[i].project, 0)
      }
      const value = projectHours.get(onlyHourRegestrationFields[i].project)
      if(value !== undefined){
        projectHours.set(onlyHourRegestrationFields[i].project, value + onlyHourRegestrationFields[i].hours)
      }
    }
  }
  return projectHours
}
export function useCalculateTypeHours(onlyHourRegestrationFields: hourRegestrationFieldType[]){
  const typeHours = new Map<string,number>();
  for (let i = 0; i < onlyHourRegestrationFields.length; i++){
    if(onlyHourRegestrationFields[i].type && onlyHourRegestrationFields[i].hours){
      if(!typeHours.has(onlyHourRegestrationFields[i].type)){
        typeHours.set(onlyHourRegestrationFields[i].type, 0)
      }
      const value = typeHours.get(onlyHourRegestrationFields[i].type)
      if(value !== undefined){
        typeHours.set(onlyHourRegestrationFields[i].type, value + onlyHourRegestrationFields[i].hours)
      }
    }
  }
  return typeHours
}
//#endregion