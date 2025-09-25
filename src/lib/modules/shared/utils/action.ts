export function onClickOutside(
  node: Node, config: {
    onclick: (e: MouseEvent) => void
  }
) {
  const handleClick = (e: MouseEvent) => {
    if (!node.contains(e.target as Node)){
      config.onclick(e);
    }
  };

  window.addEventListener('click', handleClick);

  return {
    destroy() {
      window.removeEventListener('click', handleClick);
    }
  };
}
