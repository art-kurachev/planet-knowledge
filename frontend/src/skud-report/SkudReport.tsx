import React from 'react';
import { colors } from './tokens/colors';
import { SummaryCard } from './components/SummaryCard';
import { AttentionCard } from './components/AttentionCard';
import { DailyChart } from './components/DailyChart';
import { ProjectsTable } from './components/ProjectsTable';
import { EmployeesTable } from './components/EmployeesTable';
import { EmployeeDetail } from './components/EmployeeDetail';
import './skud-report.css';

/**
 * Отчет по СКУД — адаптивный дашборд до планшета.
 * Блоки по высоте страницы, скролл в таблицах.
 */
export const SkudReport: React.FC = () => {
  return (
    <div
      className="skud-report-page"
      style={{ backgroundColor: colors.bg.page, fontFamily: 'Inter, sans-serif' }}
    >
      <div className="skud-report-row-top">
        <div className="skud-report-card-top">
          <SummaryCard />
        </div>
        <div className="skud-report-card-top">
          <AttentionCard />
        </div>
        <div className="skud-report-card-top">
          <DailyChart />
        </div>
      </div>
      <div className="skud-report-row-bottom">
        <div className="skud-report-card-bottom">
          <ProjectsTable />
        </div>
        <div className="skud-report-card-bottom">
          <EmployeesTable />
        </div>
        <div className="skud-report-card-bottom">
          <EmployeeDetail />
        </div>
      </div>
    </div>
  );
};

export default SkudReport;
