import dayjs, { Dayjs } from "dayjs";

/**
 * Transforms an object, converting any Dayjs fields to formatted strings.
 *
 * @param data - The input data which may contain Dayjs fields.
 * @returns The transformed data with Dayjs fields converted to strings.
 */
export function transformDayjsFields<T extends Record<string, any>>(
  data: T,
): { [K in keyof T]: T[K] extends Dayjs ? string : T[K] } {
  const transformedData = { ...data };

  for (const key in transformedData) {
    const value = transformedData[key];
    if (
      value &&
      typeof value === "object" &&
      (value as Dayjs)?.isValid &&
      (value as Dayjs)?.isValid()
    ) {
      (transformedData as any)[key] = (value as Dayjs).format("YYYY-MM-DD");
    }
  }

  return transformedData as {
    [K in keyof T]: T[K] extends Dayjs ? string : T[K];
  };
}

export const formatDate = (
  dateString: string,
  format: string = "D MMMM YYYY",
): string => {
  return dayjs(dateString).format(format);
};
