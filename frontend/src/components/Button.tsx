import styled from "styled-components";

const Button = styled.button`
  background-color: #65558f;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 100px;
  height: 50px;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
  transition: all 0.2s;

  &.disabled {
    background-color: #f5f5f5;
    color: #b0b0b0;
    cursor: not-allowed;
    user-select: none;
  }

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;
export default Button;
