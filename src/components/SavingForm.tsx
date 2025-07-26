// src/components/SavingForm.tsx
import React, { useState } from 'react';

type Props = {
  setTargetSaving: (value: number) => void;
  setCurrentSaving: (value: number) => void;
};

const SavingForm: React.FC<Props> = ({ setTargetSaving, setCurrentSaving }) => {
  const [target, setTarget] = useState('');
  const [current, setCurrent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTargetSaving(Number(target));
    setCurrentSaving(Number(current));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Target"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />
      <input
        type="number"
        placeholder="Current"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
      />
      <button type="submit">Set</button>
    </form>
  );
};

export default SavingForm;