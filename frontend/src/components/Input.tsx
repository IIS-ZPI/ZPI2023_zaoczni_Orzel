import { CalendarEventFill } from "@styled-icons/bootstrap";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const InputWrapper = styled.div`
  position: relative;
  background-color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #eff0f6;
  border-radius: 20px;
  height: 50px;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &.disabled {
    background-color: #f5f5f5;
    color: #b0b0b0;
    cursor: not-allowed;
    opacity: 0.5;
    user-select: none;
  }

  &.error {
    border-color: #ff4d4f;
    background-color: #fff1f0;
  }
`;

const InputCalendarIcon = styled(CalendarEventFill)`
  height: 16px;
  font-size: 16px;
`;

const InputInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const InputSpace = styled.div`
  min-width: 1px;
  //   width: 100%;
`;

const InputInnerLabel = styled.span`
  color: rgba(0, 0, 0, 0.75);
  font-size: 16px;
  font-weight: 500;
`;

const InputInnerValue = styled.div`
  font-size: 16px;
  margin-left: 10px;
  font-size: 16px;
  // font-family: monospace;
  font-weight: 600;
  color: rgba(0, 0, 0);
`;
const InnerInputPlaceholder = styled.span`
  color: rgba(0, 0, 0, 0.5);
  font-size: 16px;
  font-weight: 500;
`;

const InputInnerInput = styled.input.attrs({
  autoComplete: "off",
  //   type: "number",
  //   inputMode: "numeric",
})`
  border: none;
  // margin: 2px;
  padding: 0;
  // font-family: monospace;
  font-size: 16px;
  font-weight: 600;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  //   text-align: right;
`;

const InputDropdown = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 100%;
  padding: 5px;
`;

const InputDropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 11px;
  font-weight: 500;
  color: black;
  &:hover {
    background-color: #f2f7ff;
  }
`;

type InputProps = {
  label: string;
  //   type: string;
  value: string;
  //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({ label, value, placeholder }) => {
  return (
    <InputWrapper>
      <InputInner>
        <InputInnerLabel>{label}</InputInnerLabel>
        <InputInnerValue>
          <InputInnerInput value={value} placeholder={placeholder} />
        </InputInnerValue>
      </InputInner>
      <InputSpace />
      <InputCalendarIcon />
    </InputWrapper>
  );
};

export default Input;
export {
  InputWrapper,
  InputInner,
  InputSpace,
  InputInnerLabel,
  InputInnerValue,
  InputInnerInput,
  InputCalendarIcon,
  Wrapper,
  InputDropdown,
  InnerInputPlaceholder,
  InputDropdownItem,
};
