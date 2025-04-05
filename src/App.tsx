import * as React from 'react';
import { useState } from 'react';
import './style.css';
import Grid from './grid.tsx';
import dataList from './data.json';
import ControlForm from './controlForm.tsx';

function control(today: Date, limit: number): number {
  const rows = document.querySelectorAll('table tbody tr') as NodeListOf<HTMLTableRowElement>;
  let wrongCount = 0;

  rows.forEach((row) => {
    const cells = row.querySelectorAll('td');

    const mailDateStr = cells[1]?.textContent || '';
    const solutionDateStr = cells[2]?.textContent;

    const mailDate = new Date(mailDateStr);
    const solutionDate = solutionDateStr && solutionDateStr !== '-' 
      ? new Date(solutionDateStr) 
      : today;

    const dayDiff = Math.ceil((solutionDate.getTime() - mailDate.getTime()) / (1000 * 60 * 60 * 24));

    const shouldBeRed = dayDiff > limit; // kırmızı olmalı 
    const isRed = row.className === 'error-row'; // arka plan kırmızı demek

    if (shouldBeRed !== isRed) {
      wrongCount++;
    }
  });

  return wrongCount;
}

export default function App() {
  const [result, setResult] = useState<number | null>(null);

  const handleControlClick = (today: string, limit: number) => {
    // Kontrol: Eğer today veya limit boşsa uyarı ver
    if (!today || !limit) {
      alert('Lütfen "Today" ve "Limit" alanlarini doldurun!');
      return;
    }

    const todayDate = new Date(today);

    // Sadece çözüm gönderim tarihi boş olan satırlar için kontrol yap
    for (let item of dataList) {
      if (!item.solutionSentDate) { // Eğer çözüm gönderim tarihi boşsa
        const mailDate = new Date(item.mailReceivedDate);
        if (todayDate < mailDate) {
          alert(`HATA: Seçtiğiniz today (${today}) tarihi, ${item.name} adli adayin mail gönderim tarihinden önce olamaz!`);
          return;
        }
      }
    }

    // Eğer hata yoksa, kontrol fonksiyonunu çalıştır
    const result = control(todayDate, Number(limit));
    setResult(result);
  };

  return (
    <div>
      <h1>Dgpays Case Study : Ahmed Said Çetiner</h1>
      <Grid source={dataList} />
      <ControlForm onControlClick={handleControlClick} result={result} />
    </div>
  );
}
