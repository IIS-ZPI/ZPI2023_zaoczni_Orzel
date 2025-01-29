import styled, { css } from "styled-components";

type CardProps = {
  $gridColumn?: string;
  $gridRow?: string;
};

const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: white;
  border-radius: 20px;
  border: 1px #eff0f6 solid;
  padding: 30px 15px;
  filter: drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.05));
  grid-column: ${(props) =>
    css`
      ${props.$gridColumn || "auto"}
    `};
  grid-row: ${(props) =>
    css`
      ${props.$gridRow || "auto"}
    `};
`;

const CardTitle = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #000;
  opacity: 0.7;
`;

const CardValue = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

export { Card, CardTitle, CardValue };
