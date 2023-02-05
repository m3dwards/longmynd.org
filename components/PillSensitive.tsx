import { WarningRegular as WarningIcon } from "@fluentui/react-icons";

const PillSensitive = ({ sensitive }: { sensitive: boolean }) => {
  return (
    <>
      {sensitive && (
        <span className="pill warning">
          Sensitive <WarningIcon fontSize={20} />
        </span>
      )}
    </>
  );
};

export default PillSensitive;
