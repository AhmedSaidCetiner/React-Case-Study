import React, { useState } from 'react';
import './style.css';

interface ControlFormProps {
  onControlClick: (today: string, limit: number) => void;
  result: number | null;
}

const ControlForm: React.FC<ControlFormProps> = ({ onControlClick, result }) => {
  const todayDate = new Date().toISOString().split('T')[0];
  const [today, setToday] = useState<string>(todayDate);
  const [limit, setLimit] = useState<number | string>(5);

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseInt(value) >= 0) {
      setLimit(value);
    }
  };

  const isButtonDisabled = !today || !limit || parseInt(limit as string) < 0;

  return (
    <div className="form-container">
      <h2 className="form-header">Kontrol Formu</h2>

      <div className="input-container">
        <label className="form-label">
          <span>Today:</span>
          <input 
            type="date" 
            value={today} 
            onChange={(e) => setToday(e.target.value)} 
            className="input-style"
          />
        </label>

        <label className="form-label" style={{ marginLeft: '20px' }}>
          <span>Limit:</span>
          <input 
            type="number" 
            value={limit} 
            onChange={handleLimitChange} 
            className="input-style"
          />
        </label>
      </div>

      <button 
        onClick={() => onControlClick(today, Number(limit))} 
        className="button-style" 
        disabled={isButtonDisabled}
      >
        Kontrol Et
      </button>

      {result !== null && (
        <p className="result-text">
          Hatali boyanmis satir sayisi: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
};

export default ControlForm;
