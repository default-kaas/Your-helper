// https://www.npmjs.com/package/read-excel-file
import readXlsxFile from "read-excel-file";

type titleField = {
  typeOfField: String;
  dayTitle: String;
  hoursTitle: String;
  projectTitle: String;
  categorieTitle: String;
  descriptionTitle: String;
  wbsoHoursTitle: String;
};

type hourRegestrationField = {
  typeOfField: String;
  date: Date;
  hours: Number;
  project: String;
  type: String;
  description: String;
  wbsoHours: Number;
};

type weekNumberField = {
  typeOfField: String;
  date: String;
};

export function useIsTitleField(
  field: titleField | hourRegestrationField | weekNumberField | undefined
): field is titleField {
  if (field && field.typeOfField === 'titleField') {
    return true;
  }
  return false;
}

export function useIsWeekNumberField(
  field: titleField | hourRegestrationField | weekNumberField | undefined
): field is weekNumberField {
  if (field && field.typeOfField === 'weekNumberField') {
    return true;
  }
  return false;
}

export function useIsHourRegestrationField(
  field: titleField | hourRegestrationField | weekNumberField | undefined
): field is hourRegestrationField {
  if (field && field.typeOfField === 'hourRegestrationField') {
    return true;
  }
  return false;
}

export type ReadExcelType = null | [titleField | hourRegestrationField | weekNumberField | undefined]

export async function useReadExcel(input: HTMLElement) {
  if (input?.files) {
    return readXlsxFile(input?.files[0]).then((rows) => {
      console.log(rows)
      // TODO: find a better way to parse the row array to an type array
      const parsedResult = rows.map((row) => {
        // console.log(row);
        // TODO: find a better way to parse this
        if (row[1] === null) {
          return {
            typeOfField: 'weekNumberField',
            date: row[0],
          } as weekNumberField;
        } else if (row[1] && !(typeof row[1] ===  'number')) {
          console.log('Title?')
          return {
            // TODO: find a better way to map array values to an interface
            typeOfField: 'titleField',
            dayTitle: row[0] as String,
            hoursTitle: row[1] as String,
            projectTitle: row[2] as String,
            categorieTitle: row[3] as String,
            descriptionTitle: row[4] as String,
            wbsoHoursTitle: row[5] as String,
          } as titleField;
        } else if (row[1] !== null) {
          // TODO: find a better way to map array values to an interface
          return {
            typeOfField: 'hourRegestrationField',
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