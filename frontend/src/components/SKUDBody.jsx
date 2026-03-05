import { useState } from 'react'
import { SummaryPanel } from './SummaryPanel'
import { ProjectsPanel } from './ProjectsPanel'
import { EmployeesPanel } from './EmployeesPanel'
import { TabelPanel } from './TabelPanel'
import { C } from '../tokens/colors'

const font = "'Inter', sans-serif"

export function SKUDBody() {
  const [selProject, setSelProject] = useState(null)
  const [selEmployee, setSelEmployee] = useState(null)

  return (
    <div
      className="skud-layout"
      style={{
        fontFamily: font,
        background: C.pageBg,
        height: '100%',
      }}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0, minHeight: 0, height: 'fit-content' }}>
        <SummaryPanel />
        <ProjectsPanel
        selected={selProject}
        onSelect={(p) => {
          setSelProject(p)
          setSelEmployee(null)
        }}
        />
      </div>
      <div style={{ minWidth: 0, minHeight: 0, overflow: 'hidden', borderRadius: 24 }}>
        <EmployeesPanel
          project={selProject}
          selected={selEmployee}
          onSelect={setSelEmployee}
        />
      </div>
      <div style={{ minWidth: 0, minHeight: 0, overflow: 'hidden', borderRadius: 24 }}>
        <TabelPanel employee={selEmployee} />
      </div>
    </div>
  )
}
