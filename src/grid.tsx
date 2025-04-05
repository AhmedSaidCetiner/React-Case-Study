import React from 'react';
import './style.css';

interface Candidate {
  name: string;
  mailReceivedDate: string;
  solutionSentDate?: string;
  isBackgroundColorRed?: boolean;
}

interface GridProps {
  source: Candidate[];
}

const Grid: React.FC<GridProps> = ({ source }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table-header">İsim</th>
          <th className="table-header">Mail Gönderim Tarihi</th>
          <th className="table-header">Çözüm Gönderim Tarihi</th>
        </tr>
      </thead>
      <tbody>
        {source.map((item, index) => (
          <tr
            key={index}
            className={item.isBackgroundColorRed ? 'error-row' : ''}
          >
            <td className="table-cell">{item.name}</td>
            <td className="table-cell">{item.mailReceivedDate}</td>
            <td className="table-cell">{item.solutionSentDate || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
