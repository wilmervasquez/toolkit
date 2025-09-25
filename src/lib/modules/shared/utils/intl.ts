export const nfEs = new Intl.NumberFormat('es-PE', {style: 'currency', currency: 'PEN'});
export const lfEs = new Intl.ListFormat('es-ES');

const g = new Intl.DateTimeFormat('es', { dateStyle: 'full'})
const g2 = new Intl.DateTimeFormat('es', { dateStyle: 'long'})
const g3 = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short'})
const g4 = new Intl.DateTimeFormat('es', { dateStyle: 'short'})

console.log(g.format(new Date()));
console.log(g2.format(new Date()));
console.log(g3.format(new Date()));
console.log(g4.format(new Date()));

const currency = new Intl.NumberFormat('es-PE', { notation: 'compact', roundingMode: 'floor'}).format
console.log(currency(1289999));

const gi = new URLSearchParams({'user.name': '34&',magic:'/'})
console.log(gi.entries())

export const ftime = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' });
