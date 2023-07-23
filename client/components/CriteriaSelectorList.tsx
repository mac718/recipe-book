import { useState } from "react";
import styles from "./styles/CriteriaSelectorList.module.css";
import CriteriaSelectorListOption from "./CriteriaSelectorListOption";

type CriteriaSelectorListProps = {
  options: string[];
  onSelection: (option: string, optionType: string) => void;
  optionType: string;
};

const CriteriaSelectorList = ({
  options,
  onSelection,
  optionType,
}: CriteriaSelectorListProps) => {
  const criteriaOptions = options.map((option) => (
    <CriteriaSelectorListOption
      option={option}
      onSelection={onSelection}
      optionType={optionType}
    />
  ));

  return <div className={styles.list}>{criteriaOptions}</div>;
};

export default CriteriaSelectorList;
