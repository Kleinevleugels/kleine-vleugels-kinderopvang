const allowedDays = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"];
const allowedAges = ["baby", "dreumes", "peuter", "onbekend"];
const allowedDistricts = ["", "Centrum", "Noord", "West", "Nieuw-West", "Zuid", "Oost", "Zuidoost", "Weesp", "Omgeving Amsterdam"];
export type Interest = { name:string; email:string; phone:string; postcode:string; district:string; startMonth:string; age:string; selectedDays:string[]; requestId:string; deleteToken:string };
export function parseInterest(raw:unknown,now=new Date()):{data:Interest;error?:never}|{error:string;data?:never}{
  if(!raw||typeof raw!=="object"||Array.isArray(raw))return {error:"De aanvraag is niet geldig."};
  const p=raw as Record<string,unknown>;
  const str=(k:string)=>typeof p[k]==="string"?(p[k] as string).trim():"";
  const data:Interest={name:str("name"),email:str("email").toLowerCase(),phone:str("phone"),postcode:str("postcode"),district:str("district"),startMonth:str("startMonth"),age:str("age"),requestId:str("requestId"),deleteToken:str("deleteToken"),selectedDays:Array.isArray(p.selectedDays)?p.selectedDays.filter((x):x is string=>typeof x==="string"):[]};
  if(str("website"))return {error:"De aanvraag kon niet worden verwerkt."};
  if(!data.name||data.name.length>80||data.email.length>180||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))return {error:"Vul je voornaam en een geldig e-mailadres in."};
  if(data.phone&&!/^[+()\d\s.-]{5,24}$/.test(data.phone))return {error:"Controleer je telefoonnummer."};
  if(data.postcode&&!/^\d{4}$/.test(data.postcode))return {error:"Vul alleen de vier cijfers van je postcode in."};
  if(!allowedDistricts.includes(data.district))return {error:"Kies een geldig stadsdeel."};
  if(!allowedAges.includes(data.age))return {error:"Kies een leeftijdsfase."};
  if(!data.selectedDays.length||data.selectedDays.length>5||new Set(data.selectedDays).size!==data.selectedDays.length||!data.selectedDays.every(x=>allowedDays.includes(x))||!Array.isArray(p.selectedDays)||p.selectedDays.length!==data.selectedDays.length)return {error:"Kies minimaal één geldige voorkeursdag."};
  if(data.startMonth&&(!/^\d{4}-(0[1-9]|1[0-2])$/.test(data.startMonth)||data.startMonth<now.toISOString().slice(0,7)||data.startMonth>`${now.getUTCFullYear()+5}-12`))return {error:"Kies een startmaand vanaf deze maand en maximaal vijf jaar vooruit."};
  if(p.consent!==true)return {error:"Bevestig het gebruik van je gegevens voor deze aanvraag."};
  if(!/^[a-f0-9-]{36}$/i.test(data.requestId)||!/^[a-f0-9-]{72}$/i.test(data.deleteToken))return {error:"Vernieuw de pagina en probeer opnieuw."};
  data.selectedDays.sort((a,b)=>allowedDays.indexOf(a)-allowedDays.indexOf(b));
  return {data};
}
