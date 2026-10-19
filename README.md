# Kleine Vleugels Kinderopvang

Websiteproject voor Kleine Vleugels, dagopvang voor kinderen van 0 tot 4 jaar in Amsterdam. Dit pakket bevat de versie met het gekozen vogellogo, Lora-koppen met een normale J en afbeeldingen met hun oorspronkelijke verhoudingen.

## Inhoud

- 20 pagina’s, inclusief tien beleids- en protocolonderwerpen.
- Interactieve leeftijdskeuze, dagindeling, vraagzoeker en bruto kostenvoorbeeld.
- Een interesseformulier met servervalidatie, databaseopslag en verwijderen met een persoonlijke code.
- Het definitieve logo, sfeerbeeld en lokaal geladen lettertypen.
- Geen ingevulde aanvragen, database-inhoud, wachtwoorden of toegangstokens.

## Uploaden naar GitHub

1. Pak dit ZIP-bestand uit.
2. Maak op GitHub een nieuwe repository, bijvoorbeeld `kleine-vleugels`.
3. Upload de **uitgepakte projectbestanden**, zodat `package.json`, `app/` en `public/` direct in de hoofdmap van je repository staan. Upload niet alleen het ZIP-bestand.
4. Voor het complete project is uploaden met Git of GitHub Desktop het handigst; daarmee gaan ook bestanden zoals `.gitignore` en `.openai/hosting.json` mee.

Met Git, vanuit de uitgepakte projectmap:

```sh
git init
git add .
git commit -m "Eerste versie Kleine Vleugels"
git branch -M main
git remote add origin https://github.com/JOUW-GEBRUIKERSNAAM/kleine-vleugels.git
git push -u origin main
```

Vervang de voorbeeld-URL door de URL van je eigen repository.

## Lokaal starten

Benodigd: Node.js 22.13 of nieuwer en pnpm 11.25.0. Open een terminal in de projectmap.

```sh
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

Open het lokale adres dat in de terminal verschijnt, normaal `http://localhost:5173`. Dit is een React/Vinext-project en werkt niet door alleen een HTML-bestand dubbel aan te klikken.

### Lokale database voor het formulier

De bestaande online database zit niet in dit pakket. Maak voor lokale tests een nieuwe database met het meegeleverde schema:

```sh
pnpm build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_thin_gauntlet.sql
pnpm dev
```

De lokale opslag is gescheiden van de online interesselijst.

## Hosting

GitHub bewaart de code. Voor de werkende website is hosting nodig die de server en database ondersteunt. De huidige toepassing gebruikt een Cloudflare Worker en D1 met binding `DB`. Alleen GitHub Pages kan deze serverfuncties niet uitvoeren.

Bij eigen hosting moet een nieuwe D1-database worden gekoppeld en de SQL-migratie worden toegepast. Gebruik geen echte oudergegevens voor tests. Er is geen automatische e-maildienst gekoppeld. De `.openai/hosting.json` verwijst naar het bestaande Sites-project; dat is een projectidentificatie, geen wachtwoord en geen zelfstandige koppeling met jouw eigen hosting. De privétoegang van de huidige online website wordt niet automatisch overgenomen naar een andere host.

## Waar pas je iets aan?

- `app/page.tsx`: homepage.
- `app/[page]/page.tsx`: overige hoofdpagina’s.
- `app/beleid/[slug]/page.tsx`: individuele beleidsonderwerpen.
- `app/components/`: menu, formulier en interactieve onderdelen.
- `app/brand.css`: kleuren, lettertypen en mobiele vormgeving.
- `lib/content.ts`: leeftijdsteksten, vragen en beleidsinhoud.
- `app/api/interesse/route.ts`: opslaan en verwijderen van interesseaanvragen.
- `db/schema.ts` en `drizzle/`: databaseschema en migratie.
- `public/images/`: definitief logo en sfeerbeeld.
- `BRAND.md`: vastgelegde huisstijl en keuzes.
- `REDACTIE.md`: bronnen en nog in te vullen bedrijfsinformatie.

## Status van de inhoud

Amsterdam is de voorlopige vestigingsstad. De opvang is in voorbereiding. Adres, opening, team, tarieven, registratie en definitieve protocollen zijn nog niet vastgesteld. Bewaar die conceptstatus totdat de gegevens daadwerkelijk bekend zijn.

## Controle van deze versie

De productiebuild van de huidige versie is geslaagd. De formulieropslag en verwijdering zijn bij de eerdere oplevering online gecontroleerd. Er is geen nieuwe installatie op een andere computer of andere hosting getest.
