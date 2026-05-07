const MAP: Record<string, string> = {
  'Shadow Theatre': '#FF5F38',
  'Teatro Live!':   '#00C09A',
  'Die-Nasty':      '#7B3FE4',
  'Trunk Theatre':  '#BF1650',
  'House of Hush':  '#BF1650',
}

export function companyColor(company: string): string {
  return MAP[company] ?? '#BF1650'
}
