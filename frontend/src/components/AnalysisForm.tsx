import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "./DatePicker";
import SelectInput from "./SelectInput";
import CheckboxInput from "./CheckboxInput";
import Button from "./Button";

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

const AVAILABLE_CURRENCIES = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "DKK", label: "DKK" },
];

const minDate = new Date(2002, 0, 2);
const maxDate = new Date();
maxDate.setDate(new Date().getDate() - 1);

const AnalysisForm: React.FC = () => {
  const [timeframe, setTimeframe] = useState<string>("");
  const [periodEnd, setPeriodEnd] = useState<Date>(maxDate);
  const [currency1, setCurrency1] = useState<string>("EUR");
  const [currency2, setCurrency2] = useState<string>("");
  const [useSecondCurrency, setUseSecondCurrency] = useState<boolean>(false);

  const isFormComplete = Boolean(
    timeframe &&
      periodEnd &&
      currency1 &&
      (!useSecondCurrency || (useSecondCurrency && currency2))
  );

  return (
    <AnalysisFormWrapper>
      <SelectInput
        label="Timeframe:"
        value={timeframe}
        required
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
      <SelectInput
        label="Currency:"
        value={currency1}
        onChange={(val) => {
          setCurrency1(val);
          setCurrency2("");
        }}
        options={AVAILABLE_CURRENCIES}
      />
      <Button className={!isFormComplete ? "disabled" : ""}>
        Generate report
      </Button>
      <CheckboxInput
        label="Add currency to compare"
        value={useSecondCurrency}
        onChange={(val) => {
          setUseSecondCurrency(val);
          setCurrency2("");
        }}
      />
      <SelectInput
        label="Currency:"
        value={currency2}
        disabled={!useSecondCurrency}
        required={useSecondCurrency}
        onChange={setCurrency2}
        options={AVAILABLE_CURRENCIES.filter(
          (currency) => currency.value !== currency1
        )}
        placeholder="Choose currency"
      />
    </AnalysisFormWrapper>
  );
};

export default AnalysisForm;
