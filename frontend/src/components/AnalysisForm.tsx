import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "./DatePicker";
import SelectInput from "./SelectInput";
import CheckboxInput from "./CheckboxInput";
import Button from "./Button";
import { Currency, ReportConfig } from "../types";
import { subDateDiff } from "../utils";

const AnalysisFormWrapper = styled.div`
  display: grid;
  grid-area: form;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px 0px;
  gap: 5px 10px;
`;

type TimeframeValue = "1W" | "2W" | "1M" | "1Q" | "6M" | "1Y";
type TimeframeFormOption = { value: TimeframeValue; label: string };

const TIMEFRAME_OPTIONS: TimeframeFormOption[] = [
  { value: "1W", label: "Week" },
  { value: "2W", label: "2 Weeks" },
  { value: "1M", label: "Month" },
  { value: "1Q", label: "Quarter" },
  { value: "6M", label: "6 Months" },
  { value: "1Y", label: "Year" },
];

type CurrencyFormOption = { value: Currency; label: Currency };

const AVAILABLE_CURRENCIES: CurrencyFormOption[] = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "DKK", label: "DKK" },
];

const minDate = new Date(2002, 0, 2);
const maxDate = new Date();
maxDate.setDate(new Date().getDate() - 1);

type AnalysisFormProps = {
  onSubmit: (data: ReportConfig) => void;
  onChange: (error?: string) => void;
  isLoading: boolean;
};

const AnalysisForm: React.FC<AnalysisFormProps> = ({
  onSubmit,
  onChange,
  isLoading,
}) => {
  const [timeframe, setTimeframe] = useState<TimeframeValue | "">("");
  const [periodEnd, setPeriodEnd] = useState<Date>(maxDate);
  const [currency1, setCurrency1] = useState<Currency>("EUR");
  const [currency2, setCurrency2] = useState<Currency | "">("");
  const [useSecondCurrency, setUseSecondCurrency] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(true);

  const isFormComplete = Boolean(
    !error &&
      timeframe &&
      periodEnd &&
      currency1 &&
      (!useSecondCurrency || (useSecondCurrency && currency2))
  );

  const _onSubmit = () => {
    onSubmit({
      baseCurrency: currency1,
      quoteCurrency: currency2 !== "" ? currency2 : "PLN",
      startDate: subDateDiff(periodEnd, timeframe),
      endDate: periodEnd,
    });
  };

  const _onChange = (newData?: any) => {
    const newTimeframe = newData?.timeframe ? newData.timeframe : timeframe;
    const newEndDate = newData?.periodEnd ? newData.periodEnd : periodEnd;

    if (subDateDiff(newEndDate, newTimeframe) < minDate) {
      setError(true);
      onChange("No data available for the selected period");
    } else {
      setError(false);
      onChange();
    }
  };

  return (
    <AnalysisFormWrapper>
      <SelectInput
        label="Timeframe:"
        value={timeframe}
        required
        onChange={(val) => {
          setTimeframe(val);
          _onChange({ timeframe: val });
        }}
        placeholder="Choose timeframe"
        options={TIMEFRAME_OPTIONS}
      />
      <DatePicker
        label="Period end"
        value={periodEnd}
        onChange={(val) => {
          setPeriodEnd(val);
          _onChange({ periodEnd: val });
        }}
        minDate={minDate}
        maxDate={maxDate}
      />
      <SelectInput
        label="Currency:"
        value={currency1}
        onChange={(val) => {
          setCurrency1(val);
          setCurrency2("");
          _onChange();
        }}
        options={AVAILABLE_CURRENCIES}
      />
      <Button
        disabled={!isFormComplete || isLoading}
        className={!isFormComplete || isLoading ? "disabled" : ""}
        onClick={_onSubmit}
      >
        Generate report
      </Button>
      <CheckboxInput
        label="Add currency to compare"
        value={useSecondCurrency}
        onChange={(val) => {
          setUseSecondCurrency(val);
          setCurrency2("");
          _onChange();
        }}
      />
      <SelectInput
        label="Currency:"
        value={currency2}
        disabled={!useSecondCurrency}
        required={useSecondCurrency}
        onChange={(val) => {
          setCurrency2(val);
          _onChange();
        }}
        options={AVAILABLE_CURRENCIES.filter(
          (currency) => currency.value !== currency1
        )}
        placeholder="Choose currency"
      />
    </AnalysisFormWrapper>
  );
};

export default AnalysisForm;
