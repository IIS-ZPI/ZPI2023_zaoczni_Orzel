import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import DatePicker from "./DatePicker";
import SelectInput from "./SelectInput";

const AnalysisFormWrapper = styled.div`
  display: grid;
  grid-area: form;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px 0px;
  gap: 5px 10px;
`;

const TIMEFRAME_OPTIONS = [
  { value: "1W", label: "Week" },
  { value: "2W", label: "2 Weeks" },
  { value: "1M", label: "Month" },
  { value: "1Q", label: "Quarter" },
  { value: "6M", label: "6 Months" },
  { value: "1Y", label: "Year" },
];

const minDate = new Date(2002, 0, 2);
const maxDate = new Date();
maxDate.setDate(new Date().getDate() - 1);

const AnalysisForm: React.FC = () => {
  const [timeframe, setTimeframe] = useState<string>("");
  const [periodEnd, setPeriodEnd] = useState<Date>(maxDate);

  return (
    <AnalysisFormWrapper>
      <SelectInput
        label="Timeframe:"
        value={timeframe}
        onChange={(val) => setTimeframe(val)}
        placeholder="Choose timeframe"
        options={TIMEFRAME_OPTIONS}
      />
      <DatePicker
        label="Period end"
        value={periodEnd}
        onChange={(val) => setPeriodEnd(val)}
        minDate={minDate}
        maxDate={maxDate}
      />
    </AnalysisFormWrapper>
  );
};

export default AnalysisForm;
