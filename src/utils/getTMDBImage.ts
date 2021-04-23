type TSize = 'original' | 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780'

export default function getTMDBImage(
  path: string,
  size: TSize = 'w185'
): string {
  return `http://image.tmdb.org/t/p/${size}/${path}`
}
