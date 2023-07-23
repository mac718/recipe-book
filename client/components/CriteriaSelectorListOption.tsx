import { useState } from "react";
import styles from "./styles/CriteriaSelectorList.module.css";

type CriteriaSelectorListOptionProps = {
  option: string;
  onSelection: (option: string, optionType: string) => void;
  optionType: string;
};

const CriteriaSelectorListOption = ({
  option,
  onSelection,
  optionType,
}: CriteriaSelectorListOptionProps) => {
  const [selected, setSelected] = useState(false);

  let optionClasses = selected
    ? `${styles["option-div"]} ${styles.selected}`
    : `${styles["option-div"]}`;

  const onOptionClick = () => {
    setSelected((prev) => !prev);
    onSelection(option, optionType);
  };

  return (
    <div className={optionClasses} onClick={onOptionClick}>
      {option}
    </div>
  );
};

export default CriteriaSelectorListOption;
