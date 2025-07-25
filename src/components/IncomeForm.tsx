import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const incomeSchema = z.object({
  source: z.string().min(1, "Please enter income source"),
  amount: z.number().positive("Amount must be more than zero"),
  date: z.string().min(1, "Date is required"),
});

type IncomeData = z.infer<typeof incomeSchema>;

type Props = {
  onAddIncome: (income: IncomeData) => void;
};

const IncomeForm: React.FC<Props> = ({ onAddIncome }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IncomeData>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      source: "",
      amount: undefined,
      date: "",
    },
  });

  const submitIncome = (data: IncomeData) => {
    onAddIncome(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitIncome)}>
      <input
        placeholder="Income source"
        {...register("source")}
      />
      {errors.source && <p style={{ color: "red" }}>{errors.source.message}</p>}

      <input
        type="number"
        step="any"
        placeholder="Income amount"
        {...register("amount", { valueAsNumber: true })}
      />
      {errors.amount && <p style={{ color: "red" }}>{errors.amount.message}</p>}

      <input
        type="date"
        {...register("date")}
      />
      {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}

      <button type="submit">Add Income</button>
    </form>
  );
};

export default IncomeForm;
