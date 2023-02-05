import { CheckmarkCircle20Regular as CheckIcon, DismissCircle20Regular as ClosedIcon } from "@fluentui/react-icons";

const PillStatus = ({ status }: { status: string }) => (
  <span className={"pill " + (status.toLowerCase().includes("open") ? "green" : "red")}>
    {status} {status.toLowerCase().includes("open") && <CheckIcon />}
    {!status.toLowerCase().includes("open") && <ClosedIcon />}
  </span>
);

export default PillStatus;
