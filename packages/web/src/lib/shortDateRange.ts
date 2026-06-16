const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export function shortDateRange(show: { dateRange: string; startDate?: string; endDate?: string }): string {
  if (!show.startDate || !show.endDate) return show.dateRange.replace('Monday', 'Mon')
  const s = new Date(show.startDate)
  const e = new Date(show.endDate)
  if (e.getFullYear() > 2090) return show.dateRange.replace('Monday', 'Mon')
  const sm = MONTHS[s.getUTCMonth()], sd = s.getUTCDate()
  const em = MONTHS[e.getUTCMonth()], ed = e.getUTCDate(), ey = e.getUTCFullYear()
  if (sd === ed && sm === em) return `${sm} ${sd}, ${ey}`
  return `${sm} ${sd} – ${em} ${ed}, ${ey}`
}
