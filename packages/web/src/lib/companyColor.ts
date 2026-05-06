const MAP: Record<string, string> = {
  'Shadow Theatre': '#FF5F38',
  'Teatro Live!':   '#00C09A',
  'Die-Nasty':      '#CDAAFF',
  'Trunk Theatre':  '#4361EE',
  'House of Hush':  '#4361EE',
}

export function companyColor(company: string): string {
  return MAP[company] ?? '#4361EE'
}
