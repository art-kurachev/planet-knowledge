import React, { useState } from 'react';
import { colors } from './tokens/colors';
import { SummaryCard } from './components/SummaryCard';
import { AttentionCard } from './components/AttentionCard';
import { DailyChart } from './components/DailyChart';
import { ProjectsTable } from './components/ProjectsTable';
import { EmployeesTable } from './components/EmployeesTable';
import { EmployeeDetail } from './components/EmployeeDetail';
import './skud-report.css';

/** Выбранный проект (из Проекты или Требует внимания) */
const DEFAULT_PROJECT = { id: '1', name: 'ул. Гагарина, д. 33, корп. 1 ЖК «Созвездие»' };

/** Выбранный сотрудник (из таблицы сотрудников) */
const DEFAULT_EMPLOYEE = { id: '4', name: 'Махмудов Кобулбек Махмудович' };

/**
 * Отчет по СКУД — адаптивный дашборд до планшета.
 * Блоки по высоте страницы, скролл в таблицах.
 */
export const SkudReport: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(DEFAULT_PROJECT);
  const [selectedEmployee, setSelectedEmployee] = useState(DEFAULT_EMPLOYEE);

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
          <AttentionCard onItemClick={(id, name) => setSelectedProject({ id, name })} />
        </div>
        <div className="skud-report-card-top">
          <DailyChart />
        </div>
      </div>
      <div className="skud-report-row-bottom">
        <div className="skud-report-card-bottom">
          <ProjectsTable
          activeId={selectedProject.id}
          onRowClick={(id, name) => setSelectedProject({ id, name })}
        />
        </div>
        <div className="skud-report-card-bottom">
          <EmployeesTable
            address={selectedProject.name}
            activeId={selectedEmployee.id}
            onRowClick={(id, name) => setSelectedEmployee({ id, name })}
          />
        </div>
        <div className="skud-report-card-bottom">
          <EmployeeDetail key={selectedEmployee.id} name={selectedEmployee.name} projectName={selectedProject.name} />
        </div>
      </div>
    </div>
  );
};

export default SkudReport;
