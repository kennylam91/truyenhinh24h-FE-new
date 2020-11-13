import Vue from 'vue'
import { parseTime, convertVNToEN } from "~/assets/js/utils";
Vue.filter('uppercaseAll', val => val.toUpperCase())
Vue.filter('uppercaseFirst', string => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
  } else {
    return null
  }
}
)
Vue.filter('parseTimeToHourMin', dateTime => {
  return parseTime(dateTime, '{H}:{i}')
})
Vue.filter('parseTimeFullFormat', dateTime => {
  return parseTime(dateTime, '{d}-{m}-{Y} {H}:{i}')
})