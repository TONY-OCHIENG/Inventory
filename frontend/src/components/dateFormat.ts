type DateInput = string | number | Date;

export function formatDate(
  input: DateInput,
  format: string = "YYYY-MM-DD",
  useUTC: boolean = false
): string {
  const d = new Date(input);
  if (isNaN(d.getTime())) throw new Error("Invalid date");

  const pad = (n: number): string => String(n).padStart(2, "0");

  const year = useUTC ? d.getUTCFullYear() : d.getFullYear();
  const month = (useUTC ? d.getUTCMonth() : d.getMonth()) + 1;
  const day = useUTC ? d.getUTCDate() : d.getDate();
  const hours = useUTC ? d.getUTCHours() : d.getHours();
  const minutes = useUTC ? d.getUTCMinutes() : d.getMinutes();
  const seconds = useUTC ? d.getUTCSeconds() : d.getSeconds();

  const tokens: Record<string, string> = {
    YYYY: String(year),
    YY: String(year).slice(-2),
    MM: pad(month),
    DD: pad(day),
    HH: pad(hours),
    mm: pad(minutes),
    ss: pad(seconds),
  };

  return format.replace(/YYYY|YY|MM|DD|HH|mm|ss/g, (t) => tokens[t]);
}