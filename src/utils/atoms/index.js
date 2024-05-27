import {atom} from "recoil"

const sidebarToggle = atom({
  key: 'sidebarToggle',
  default: false,
})

const sidebarCollapse = atom({
  key: 'sidebarCollapse',
  default: false,
})

export { sidebarToggle, sidebarCollapse }