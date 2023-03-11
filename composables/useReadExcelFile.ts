// https://www.npmjs.com/package/read-excel-file
import readXlsxFile from "read-excel-file";

type titleField = {
  dayTitle: String;
  hoursTitle: String;
  projectTitle: String;
  categorieTitle: String;
  descriptionTitle: String;
  wbsoHoursTitle: String;
};

type hourRegestrationField = {
  date: Date;
  hours: Number;
  project: String;
  type: String;
  description: String;
  wbsoHours: Number;
};

type weekNumberField = {
  date: String;
};

export function useIsTitleField(
  field: titleField | hourRegestrationField | weekNumberField | undefined
): field is titleField {
  if (field && (<titleField>field).dayTitle !== undefined) {
    return true;
  }
  return false;
}

export function useIsHourRegestrationField(
  field: titleField | hourRegestrationField | weekNumberField | undefined
): field is hourRegestrationField {
  if (field && (<hourRegestrationField>field).hours !== undefined) {
    return true;
  }
  return false;
}

export type ReadExcelType = null | [titleField | hourRegestrationField | weekNumberField | undefined]

export async function useReadExcel(input: HTMLElement) {
  if (input?.files) {
    return readXlsxFile(input?.files[0]).then((rows) => {
      // TODO: find a better way to parse the row array to an type array
      const parsedResult = rows.map((row) => {
        console.log(row);
        // TODO: find a better way to parse this
        if (row[1] === null) {
          return {
            date: row[0],
          } as weekNumberField;
        } else if (row[1] && row[1] instanceof String) {
          console.log("check if", row);
          return {
            // TODO: find a better way to map array values to an interface
            dayTitle: row[0] as String,
            hoursTitle: row[1] as String,
            projectTitle: row[2] as String,
            categorieTitle: row[3] as String,
            descriptionTitle: row[4] as String,
            wbsoHoursTitle: row[5] as String,
          } as titleField;
        } else if (row[1] && row[0] instanceof Date) {
          // TODO: find a better way to map array values to an interface
          return {
            date: row[0] as unknown as Date,
            hours: row[1] as Number,
            project: row[2] as String,
            type: row[3] as String,
            description: row[4] as String,
            wbsoHours: row[5] as Number,
          } as hourRegestrationField;
        }
        return undefined;
      }) as
        | [titleField | hourRegestrationField | weekNumberField | undefined]
        | null
      return parsedResult
    });
  }
  return null
}