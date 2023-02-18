export function columnsList(columnFormatter: any, ...keys: string[]) {
  return keys.map(key => columnFormatter(key));
}
