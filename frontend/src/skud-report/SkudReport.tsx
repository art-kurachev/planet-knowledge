import React, { useState } from 'react';
import { SummaryCard } from './components/SummaryCard';
import { AttentionCard } from './components/AttentionCard';
import { DailyChart } from './components/DailyChart';
import { ProjectsTable } from './components/ProjectsTable';
import { EmployeesTable } from './components/EmployeesTable';
import { EmployeeDetail } from './components/EmployeeDetail';
import { EmptyStatePlaceholder } from './components/EmptyStatePlaceholder';
import './skud-report.css';

/**
 * Отчет по СКУД — адаптивный дашборд до планшета.
 * При первом включении проект и сотрудник не выбраны — показываются заглушки.
 */
export const SkudReport: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<{ id: string; name: string } | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: string; name: string } | null>(null);

  return (
    <div
      className="skud-report-page"
      style={{ background: 'linear-gradient(283deg, #6F97E9 0%, #AFCFE9 100%), #EFF1F8', fontFamily: 'Inter, sans-serif' }}
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
            activeId={selectedProject?.id}
            onRowClick={(id, name) => {
              setSelectedProject({ id, name });
              setSelectedEmployee(null);
            }}
          />
        </div>
        <div className="skud-report-card-bottom">
          {selectedProject ? (
            <EmployeesTable
              address={selectedProject.name}
              activeId={selectedEmployee?.id ?? undefined}
              onRowClick={(id, name) => setSelectedEmployee({ id, name })}
            />
          ) : (
            <EmptyStatePlaceholder
              title="Сотрудники"
              subtitle="Выберите Проект"
              icon="people"
            />
          )}
        </div>
        <div className="skud-report-card-bottom">
          {selectedEmployee && selectedProject ? (
            <EmployeeDetail
              key={selectedEmployee.id}
              name={selectedEmployee.name}
              projectName={selectedProject.name}
            />
          ) : (
            <EmptyStatePlaceholder
              title="Табель"
              subtitle="Выберите сотрудника для просмотра табеля"
              icon="personalcard"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SkudReport;
