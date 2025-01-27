import styled from "styled-components";
import { InputInner, InputInnerLabel, InputSpace, InputWrapper } from "./Input";

const InnerInputCheckbox = styled.input.attrs({ type: "checkbox" })`
  accent-color: #65558f;
`;

type CheckboxInputProps = {
  label: string;
  value: any;
  disabled?: boolean;
  onChange: (value: any) => void;
};

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  value,
  disabled = false,
  onChange,
}) => {
  return (
    <InputWrapper
      className={disabled ? "disabled" : ""}
      onClick={disabled ? undefined : () => onChange(!value)}
    >
      <InputInner>
        <InnerInputCheckbox
          checked={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <InputInnerLabel style={{ paddingLeft: "10px" }}>
          {label}
        </InputInnerLabel>
      </InputInner>
      <InputSpace />
    </InputWrapper>
  );
};

export default CheckboxInput;
