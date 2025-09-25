let isOpenSidebar = $state(false);

export function getIsOpenSidebar() {
  return isOpenSidebar
}

export function setIsOpenSidebar() {
  isOpenSidebar = !isOpenSidebar
}
