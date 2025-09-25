export const tw = {
  border: 'border border-red-500 dark:border-[#27272D]',
  background: 'bg-[] dark:bg-[#1E1E23]'
}

export const flex = {
  col: 'flex flex-col',
  rowCenter: 'flex items-center',
  rowCenterBeetween: 'flex items-center justify-between',
  center: 'flex items-center',
  centerBetween: 'flex items-center justify-betweenz'
}

const flex2 = Object.assign(
  function (p: 'sd') {
    return 'flex items-center';
  }, {
    center: 'flex items-center',
    start: 'flex items-start',
    end: 'flex items-end',
    between: 'flex items-between',
    around: 'flex items-around',
    col: {
      start: 'flex flex-col justify-start items-center',
      end: 'flex flex-col justify-end items-center',
      center: 'flex flex-col justify-center items-center',
      between: 'flex flex-col justify-between items-center',
      around: 'flex flex-col justify-around items-center',
    }
  }
);

const grid = {
  center: 'grid place-items-center'
}
