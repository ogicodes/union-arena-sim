import { CSSProperties } from 'react'
import { cva } from 'class-variance-authority'
import cn from 'classnames'
import './grid.scss'

interface GridProps {
  rows: number
  columns: number
  children: React.ReactNode
}

const Grid = ({ rows, columns, children }: GridProps) => (
  <div className="grid" style={{ '--rows': rows, '--columns': columns } as CSSProperties}>
    <div className="grid-guides">
      {Array.from({ length: rows * columns }, (_, index) => {
        // The x and y position of the cell
        const x = (index % columns) + 1
        const y = Math.floor(index / columns) + 1
        return <div className="grid-guide" style={{ '--x': x, '--y': y } as CSSProperties} />
      })}
    </div>
    {/* Cells */}
    {children}
  </div>
)

interface GridSystemProps extends React.HTMLProps<HTMLDivElement> {}

Grid.System = ({ className = '', children }: GridSystemProps) => {
  const gridVariants = cva('')

  return <section className={cn(gridVariants({ className }))}>{children}</section>
}

interface CellProps {
  row?: number | string
  column: number
  children: React.ReactNode
}

Grid.Cell = ({ row = 'auto', column, children }: CellProps) => (
  <div className="grid-cell" style={{ gridRow: row, gridColumn: column }}>
    {children}
  </div>
)

interface CrossProps {
  row: number
  column: number
}

Grid.Cross = ({ row, column }: CrossProps) => (
  <div className="grid-cross" style={{ gridRow: row, gridColumn: column }}>
    <svg width={30} height={30}>
      <line x1={5} y1={15} x2={25} y2={15} stroke="#fafafa" strokeWidth={1} />
      <line x1={15} y1={5} x2={15} y2={25} stroke="#fafafa" strokeWidth={1} />
    </svg>
  </div>
)

export { Grid }
