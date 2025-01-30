export function formatTimeToAMPM(time: string, isCheckIn: boolean = false): string {
  try {
    if (!time) {
      return isCheckIn ? "02:00 pm" : "11:00 am"
    }
    
    const [hours, minutes] = time.split(':').map(num => parseInt(num))
    
    if (isNaN(hours) || isNaN(minutes)) {
      return isCheckIn ? "02:00 pm" : "11:00 am"
    }
    
    const period = hours >= 12 ? 'pm' : 'am'
    const formattedHour = (hours % 12 || 12).toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    
    return `${formattedHour}:${formattedMinutes} ${period}`
  } catch (error) {
    console.error('Error formatting time:', error)
    return isCheckIn ? "02:00 pm" : "11:00 am"
  }
}