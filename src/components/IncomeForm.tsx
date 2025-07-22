type Props = {
  handleAddSource: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddDate: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  handleSubmit: (e: React.FormEvent) => void;
  source: string;
  amount: number;
  date: string;
};

export default function IncomeForm({
  handleAddSource,
  handleAddAmount,
  handleAddDate,
  handleSubmit,
  source,
  amount,
  date,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={source} onChange={handleAddSource} placeholder="Source" />
      <input type="number" value={amount} onChange={handleAddAmount} placeholder="Amount" />
      <input type="date" value={date} onChange={handleAddDate} />
      <button type="submit">Add Income</button>
    </form>
  );
}
