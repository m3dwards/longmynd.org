import { parseISO, format } from "date-fns";

export default function DateComponent({ date }: { date: Date }) {
  return <time dateTime={date.toString()}>{format(date, "dd LLLL, yyyy")}</time>;
}
