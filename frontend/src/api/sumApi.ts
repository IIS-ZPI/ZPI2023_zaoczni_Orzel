import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const calculateSum = (num1: number, num2: number) => {
  return axios.post(
    `${BASE_URL}/calculate`,
    { num1, num2 },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
