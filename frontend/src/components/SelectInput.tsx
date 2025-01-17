import styled from "styled-components";
import {
  InnerInputPlaceholder,
  InputDropdown,
  InputDropdownItem,
  InputInner,
  InputInnerLabel,
  InputInnerValue,
  InputSpace,
  InputWrapper,
} from "./Input";
import { CaretDownFill } from "@styled-icons/bootstrap";
import { useState } from "react";
import { useBlur } from "../hooks/useBlur";

const InputCaretDownIcon = styled(CaretDownFill)`
  height: 16px;
  font-size: 16px;
  transition: transform 0.4s;
  fill: black;
`;

type SelectOptionData = {
  value: any;
  label: any;
};

type SelectInputProps = {
  label: string;
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  options: SelectOptionData[];
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  placeholder,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSelect = (value: any) => {
    onChange(value);
    setIsOpen(false);
  };

  const { blurRef } = useBlur({ onBlur: () => setIsOpen(false) });

  const selectedOption = options.find((option) => option.value === value);

  return (
    <InputWrapper onClick={() => setIsOpen(!isOpen)} ref={blurRef}>
      <InputInner>
        <InputInnerLabel>{label}</InputInnerLabel>
        <InputInnerValue>
          {selectedOption?.label || (
            <InnerInputPlaceholder>{placeholder}</InnerInputPlaceholder>
          )}
        </InputInnerValue>
      </InputInner>
      <InputSpace />
      <InputCaretDownIcon transform={isOpen ? "rotate(180)" : ""} />
      {isOpen && (
        <InputDropdown>
          {options.map((option) => (
            <InputDropdownItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </InputDropdownItem>
          ))}
        </InputDropdown>
      )}
    </InputWrapper>
  );
};

export default SelectInput;
