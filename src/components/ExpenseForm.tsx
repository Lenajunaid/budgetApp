import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
  source: z.string().min(1, "Please enter the expense source"),
  amount: z.number().positive("Please enter an amount greater than zero"),
  date: z.string().min(1, "Please pick a date"),
});

type ExpenseData = z.infer<typeof validationSchema>;

type Props = {
  onAddExpense: (expense: ExpenseData) => void;
};

const ExpenseForm: React.FC<Props> = ({ onAddExpense }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseData>({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
    defaultValues: {
      source: "",
      amount: undefined,
      date: "",
    },
  });

  const submitHandler = (data: ExpenseData) => {
    onAddExpense(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input
        placeholder="Expense source"
        {...register("source")}
      />
      {errors.source && <p style={{ color: "red" }}>{errors.source.message}</p>}

      <input
        type="number"
        step="any"
        placeholder="Expense amount"
        {...register("amount", { valueAsNumber: true })}
      />
      {errors.amount && <p style={{ color: "red" }}>{errors.amount.message}</p>}

      <input
        type="date"
        {...register("date")}
      />
      {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}

      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;