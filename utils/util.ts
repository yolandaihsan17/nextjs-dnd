
export function getDate(date: string = '') {
  return new Date(date).toLocaleDateString(
    'id-ID',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'utc',
      hour: '2-digit',
      minute: '2-digit',
    }
  )
}

export function getDuration(totalSecond: number = 0) {
  const hour = Math.floor(totalSecond / 3600)
  const minute = Math.floor((totalSecond - (hour * 3600)) / 60)
  return `${hour}:${minute}`
}