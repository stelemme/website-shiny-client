import {atom} from "recoil"

const sidebarToggle = atom({
  key: 'sidebarToggle',
  default: false,
})

export { sidebarToggle }