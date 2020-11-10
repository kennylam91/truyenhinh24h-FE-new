// Pattern
// {d} Day of the month as a numeric value (01 to 31)
// {D} Day of the month as a numeric value (0 to 31)
// {H} Hour (00 to 23)
// {h} Hour (00 to 11)
// {I} Minutes (0 to 59)
// {i} Minutes (00 to 59)
// {k} Hour (0 to 23)
// {l} Hour (00 to 11)
// {g} Month name in full (January to December)
// {m} Month name as a numeric value (00 to 12)
// {M} Month name as a numeric value (0 to 12)
// {p} AM or PM
// {S} Seconds (0 to 59)
// {s} Seconds (00 to 59)
// {w} Weekday name in full (Sunday to Saturday, Sunday=0 and Saturday=6)
// {Y} Year as a numeric, 4-digit value
// {y} Year as a numeric, 2-digit value
export function parseTime(timeInput, format) {
  if (arguments.length === 0 || !timeInput) {
    return null
  }
  let time
  if (typeof timeInput === 'object') {
    time = timeInput
  } else {
    return null
  }
  const formatObj = {
    d: time.getDate().toString().padStart(2, 0),
    D: time.getDate().toString(),
    m: (time.getMonth() + 1).toString().padStart(2, 0),
    M: (time.getMonth() + 1).toString(),
    g: (time.getMonth() + 1).toString(),
    y: (time.getFullYear() % 100).toString().padStart(2, 0),
    Y: time.getFullYear().toString(),
    H: time.getHours().toString().padStart(2, 0),
    h: time.getHours() < 12 ? time.getHours() : time.getHours() - 12,
    l: time.getHours() < 12 ? time.getHours().toString().padStart(2, 0) : (time.getHours() - 12).toString().padStart(2, 0),
    k: time.getHours().toString(),
    i: time.getMinutes().toString().padStart(2, 0),
    I: time.getMinutes().toString(),
    s: time.getSeconds().toString().padStart(2, 0),
    S: time.getSeconds().toString(),
    w: time.getDay().toString(),
    p: time.getHours() < 12 ? 'AM' : 'PM'
  }
  const timeStr = format.replace(/{([dmMyYHiIsSDkghlwp])+}/g, (result, key) => {
    if (key === 'g') {
      const monthMap = new Map([
        ['1', 'January'], ['2', 'February'], ['3', 'March'], ['4', 'April'], ['5', 'May'], ['6', 'June'],
        ['7', 'July'], ['8', 'August'], ['9', 'September'], ['10', 'October'], ['11', 'November'], ['12', 'December']
      ])
      return monthMap.get(formatObj[key])
    }
    if (key === 'w') {
      const weekdayMap = new Map([
        ['0', 'Thứ bảy'], ['1', 'Thứ hai'], ['2', 'Thứ ba'], ['3', 'Thứ tư'], ['4', 'Thứ năm'],
        ['5', 'Thứ sáu'], ['6', 'Thứ bảy']
      ])
      return weekdayMap.get(formatObj[key])
    }
    return formatObj[key]
  })
  return timeStr
}

/**
 * Remove all space in object properties if that property is a string
 * @param {object} source
 */
export function trimObject(source) {
  if (!source) {
    return null
  }
  Object.keys(source).forEach(function(key) {
    source[key] = typeof source[key] === 'string' ? source[key].trim() : source[key]
  })
  return source
}