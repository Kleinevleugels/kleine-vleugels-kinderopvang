# Kleine Vleugels Kinderopvang — complete website voor GitHub

Dit pakket bevat de volledige openbare website. De map `docs` bevat alle pagina’s, JavaScript, stijlen, lettertypen, afbeeldingen en tien beleidsdownloads als opgemaakte PDF. Je kunt alles uit deze ZIP in één keer uploaden.

## Uploaden vanaf het scherm met de repositorybestanden

1. Pak de ZIP uit op je computer en open de uitgepakte map.
2. Daar zie je precies twee onderdelen: de map **docs** en dit bestand **README.md**.
3. Open https://github.com/KleineVleugels/kleine-vleugels-kinderopvang en ga naar **Code**, op het hoogste niveau van de repository. Je ziet daar bijvoorbeeld `package.json` en de mappen `app`, `public` en `docs`.
4. Kies **Add file > Upload files**. Sleep **docs én README.md samen** naar het uploadvak. Sleep niet het ZIP-bestand en niet de bovenliggende uitgepakte map.
5. Controleer in de uploadlijst dat je onder andere `docs/index.html`, `docs/beleid/index.html`, `docs/assets/interactief.js` en `docs/CNAME` ziet. Het mag geen `docs/docs/index.html` of extra map met de naam van de ZIP worden.
6. Schrijf als omschrijving bijvoorbeeld **PDF-beleidsstukken en leesbare downloadknoppen**. Kies **Commit directly to main** en klik **Commit changes**.
7. Open **Actions** en wacht op een geslaagde Pages-publicatie.
8. Open https://kleinevleugels.nl/beleid/ en druk op **Ctrl + F5**. Open een beleidsstuk en klik op **Download PDF**. Het document bevat het logo, de huisstijl en paginanummers.

## Instellingen behouden

**Settings > Pages** blijft: **Deploy from a branch**, branch **main**, folder **/docs**. Het eigen domein blijft **kleinevleugels.nl** en **Enforce HTTPS** blijft aan. De domeinkoppeling staat ook in `docs/CNAME`; dat bestand wordt meegeüpload. DNS en Google Search Console hoef je voor deze update niet opnieuw in te stellen.

## Waarom alleen docs de website bepaalt

De andere mappen zijn bronbestanden van de eerdere ontwikkelversie. Bij publicatie uit `main /docs` gebruikt GitHub Pages de inhoud van `docs` voor de website. De nieuwe map is dus geen gedeeltelijke update: alle onderdelen van de openbare website zitten erin. De andere mappen kunnen blijven staan. Deze ZIP actualiseert de openbare website, niet de oorspronkelijke ontwikkelcode buiten docs.

Bestanden met hetzelfde pad worden bij upload bijgewerkt. Bestanden die je niet opnieuw uploadt, worden niet automatisch gewist. Dit pakket bevat ook `docs/images/samen-ontdekken.webp`: onder die oude bestandsnaam staat nu een verliesloos omgezet exemplaar van het nieuwe AI-sfeerbeeld. Zo wordt ook de oude afbeelding overschreven en hoef je die niet apart te verwijderen.

## Inhoud en werking

- Alle tien beleidsstukken en bijpassende PDF-downloads met logo, huisstijl, paginanummers en navigeerbare hoofdstukken. De eerdere tekstbestanden blijven beschikbaar voor bestaande links.
- Groene downloadknoppen met goed leesbare witte tekst en een wit downloadpictogram.
- De drie leeftijdsgroepen: baby’s 0–1 jaar, dreumesen 1–2 jaar en peuters 2–4 jaar.
- Afgestemde teksten over wennen, mentorschap, twee ontwikkelingsgesprekken per jaar, slaap en rust, verzorging, voeding, veiligheid, privé-updates, klachten en ophalen.
- Mobiel menu, leeftijdstabs, dagritme met pijlen en toetsenbordbediening, zoekfuncties, filters, downloads en bruto rekentool.
- Het gekozen vogellogo, de bestaande kleuren en lettertypen.
- Het nieuwe AI-sfeerbeeld, zichtbaar als illustratie aangeduid, zonder echte kindfoto’s als invoer.
- Het eigen domein, relatieve paden, sitemap en zoekmachine-instellingen.

Het aanmeldformulier en de automatische ontvangstmail zijn nog niet aangesloten. De rekentool gebruikt een aanpasbaar voorbeeldtarief. Menu, tariefinclusies, openingsweken en een eventuele vergoeding bij herhaald te laat ophalen blijven open. Adres, openingsdatum, capaciteit en registratie moeten nog worden bevestigd.

## Controle en status

Update 21 oktober 2026, pakketversie 9. Gebaseerd op de actuele openbare GitHub-versie van de website. Alle tien volledige beleidsteksten zijn vergeleken met de PDF's. Alle 21 PDF-pagina's zijn gerenderd en visueel gecontroleerd; ook de hoofdstuknavigatie en paginanummers zijn gecontroleerd. De downloadlinks, 572 relatieve bestandsverwijzingen, domeininstellingen en ZIP-integriteit zijn gecontroleerd. De downloadknoppen hebben minimaal 5,85:1 contrast tussen witte tekst en groene achtergrond. De CSS-regels zijn technisch gecontroleerd voor mobiel en desktop, inclusief hover, toetsenbordfocus en bezochte links. Een visuele browsertest van de website was in de maakomgeving niet beschikbaar.

De vastgestelde inhoud is voor deze opmaakupdate niet herschreven. Logo, foto's, lettertypen, JavaScript en bestaande instellingen komen uit de opgehaalde websiteversie.

Dit pakket uploadt of verwijdert zelf niets in je GitHub-account. De wijzigingen worden pas openbaar na jouw upload en een geslaagde Pages-publicatie.

## Officiële GitHub-uitleg

- https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
