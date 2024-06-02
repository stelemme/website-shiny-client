import { atom } from "recoil"

const sidebarToggle = atom({
  key: 'sidebarToggle',
  default: false,
})

const sidebarCollapse = atom({
  key: 'sidebarCollapse',
  default: false,
})

const alertOpen = atom({
  key: 'alertOpen',
  default: false,
})

const alertSeverity = atom({
  key: 'alertSeverity',
  default: "success",
})

const alertMessage = atom({
  key: 'alertMessage',
  default: "Everything works fine!",
})

export { sidebarToggle, sidebarCollapse, alertOpen, alertSeverity, alertMessage }