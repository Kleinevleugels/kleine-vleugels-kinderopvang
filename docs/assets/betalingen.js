export function calculatePayment({year,rate,days,hours,weeks,percentage}) {
  const inputs=[year,rate,days,hours,weeks,percentage];
  if(inputs.some(v=>typeof v!=='number'||!Number.isFinite(v)) || ![2026,2027].includes(year) || rate<0 || rate>100 || days<1 || days>5 || hours<.5 || hours>24 || weeks<1 || weeks>52 || percentage<0 || percentage>96) throw new RangeError('Ongeldige invoer');
  const maximumRate=year===2027?11.60:11.23;
  const monthlyHours=days*hours*weeks/12;
  const eligibleHours=Math.min(monthlyHours,230);
  const invoice=monthlyHours*rate;
  const allowance=eligibleHours*Math.min(rate,maximumRate)*percentage/100;
  return {maximumRate,monthlyHours,eligibleHours,invoice,allowance,net:invoice-allowance};
}
if(typeof document!=='undefined'){
 const form=document.querySelector('#payment-example');
 if(form){
  const money=new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR'});
  const number=new Intl.NumberFormat('nl-NL',{maximumFractionDigits:2});
  const set=(id,text)=>{document.getElementById(id).textContent=text;};
  const update=()=>{
   try{
    const values={};for(const name of ['year','rate','days','hours','weeks','percentage']){const value=form.elements.namedItem(name).value.trim();if(value==='')throw new Error('Leeg');values[name]=Number(value);}
    const r=calculatePayment(values);
    document.getElementById('payment-error').hidden=true;document.getElementById('payment-results').hidden=false;
    set('payment-hours',number.format(r.monthlyHours)+' uur');set('payment-invoice',money.format(r.invoice));set('payment-allowance',money.format(r.allowance));set('payment-net',money.format(r.net));
    set('payment-cap',`Toeslaggrondslag: maximaal ${money.format(r.maximumRate)} per uur in ${values.year}.`);
    document.getElementById('payment-limit').hidden=r.monthlyHours<=230;
   }catch{document.getElementById('payment-error').hidden=false;document.getElementById('payment-results').hidden=true;document.getElementById('payment-limit').hidden=true;}
  };
  form.addEventListener('submit',e=>{e.preventDefault();update();});form.addEventListener('input',update);form.addEventListener('change',update);update();
 }
}
