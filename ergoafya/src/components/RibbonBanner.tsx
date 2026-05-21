const items = [
  'Workplace Ergonomic Assessments','Musculoskeletal Disorder Prevention',
  'Return-to-Work Support','Manual Handling & Back Care Training',
  'Workstation Design & Optimization','Posture & Musculoskeletal Health',
  'Workplace Injury Prevention','Assistive Device Recommendations',
]

export default function RibbonBanner() {
  const doubled = [...items, ...items]
  return (
    <div className="ribbon">
      <div className="ribbon-track">
        {doubled.map((item, i) => (
          <span key={i} className="ribbon-item">{item}</span>
        ))}
      </div>
    </div>
  )
}
