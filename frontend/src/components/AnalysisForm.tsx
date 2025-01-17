import React from "react";
import styled from "styled-components";

const AnalysisFormWrapper = styled.div`
  display: grid;
  grid-area: form;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px 0px;
  gap: 5px 10px;
`;

const AnalysisForm: React.FC = () => {
  return (
    <AnalysisFormWrapper>
      <div>test</div>
    </AnalysisFormWrapper>
  );
};

export default AnalysisForm;
