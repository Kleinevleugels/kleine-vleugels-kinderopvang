# Kleine Vleugels - website met contactformulier

Dit is de volledige website voor GitHub Pages: alle pagina’s, afbeeldingen, lettertypen, JavaScript en tien beleids-PDF’s. De tekst “AI-sfeerbeeld ter illustratie” is overal uit de webpagina’s verwijderd. Ouders kunnen een bericht sturen naar Kleinevleugels@gmail.com.

## Uploaden

1. Pak de ZIP uit.
2. Open https://github.com/KleineVleugels/kleine-vleugels-kinderopvang op het tabblad Code, op het hoogste niveau.
3. Kies Add file > Upload files. Sleep docs en README.md samen naar het uploadvak, zonder de bovenliggende map of het ZIP-bestand.
4. Je moet paden als docs/index.html en docs/contact/index.html zien, niet docs/docs/index.html.
5. Kies Commit directly to main en Commit changes. Wacht tot de Pages-publicatie onder Actions is geslaagd.
6. Open https://kleinevleugels.nl/contact/ en ververs met Ctrl + F5.

GitHub werkt bestanden met hetzelfde pad bij. Je hoeft de website niet eerst te verwijderen. Settings > Pages blijft main /docs. Het eigen domein blijft kleinevleugels.nl en HTTPS blijft aan.

## Eenmalig de mailontvangst activeren

FormSubmit bezorgt de berichten op onze Gmail. De koppeling is op de aangeleverde screenshot bevestigd met een ontvangen testbericht. Als jullie adres al is geactiveerd, hoef je daarvoor geen account of nieuwe maildienst in te richten. De onderstaande stappen blijven nuttig bij een nieuwe activatie of controle.

1. Verstuur na de upload zelf een testbericht via de contactpagina.
2. Open Kleinevleugels@gmail.com. Bij het eerste gebruik stuurt FormSubmit een activatiemail. Controleer ook de spammap.
3. Klik in die e-mail op de bevestiging, meestal Activate Form of Confirm your email. Alleen de eigenaar van deze mailbox kan dit afronden.
4. Verstuur daarna nog een testbericht en controleer of de inhoud in Gmail verschijnt. Via Beantwoorden reageer je op het ingevulde e-mailadres.

FormSubmit vraagt geen nieuwe bevestiging wanneer de gebruikte combinatie al is geactiveerd. Controleer in dat geval direct het testbericht. Tot de bevestiging kunnen berichten bij de formulierdienst in afwachting blijven staan; beschouw de koppeling daarom pas als actief na de controle in Gmail.

## Wat ouders zien

Het formulier vraagt om naam, e-mailadres en bericht, met een optioneel telefoonnummer en een keuze voor regio en onderwerp. Bij bevestigde verwerking opent de website onze nieuwe Nederlandstalige bedankpagina, met het gekozen logo, crème achtergrond, groene accenten en duidelijke vervolgknoppen. Die staat op docs/bedankt.html en blijft ook via /contact/bedankt/ bereikbaar.

De verzending in de achtergrond gebruikt normale formuliergegevens, zodat de browser geen extra aanvraag voor JSON-toestemming hoeft te doen. We tonen de bevestiging uitsluitend na een positief antwoord van de formulierdienst. Een mislukte of onbevestigde verzending wist de invoer niet en toont een extra knop om via de normale formulierpagina te versturen. Er wordt nooit automatisch opnieuw verzonden. Zonder JavaScript blijft de gewone formulierverzending beschikbaar, met eventuele spamcontrole. Het formulier schrijft geen gegevens naar browseropslag. Op de contactpagina staat altijd een directe maillink.

Na de upload controleren we met een testbericht of de vernieuwde route op jouw browser de eigen bedankpagina opent en de mail in Gmail aankomt. De oude blauwe tabel is vervangen door het vaste FormSubmit-sjabloon box. Dat toont de gegevens in losse vakken. FormSubmit biedt alleen basic, table en box: de afzender, dienstteksten en sjabloonkleuren zijn daarmee niet volledig in onze eigen huisstijl te zetten.

De formulierdienst en de verwerking van contactgegevens staan op de bijgewerkte privacypagina. De bevestiging voor ouders staat op het scherm; een automatische ontvangstmail aan de ouder is in deze uitvoering niet ingesteld.

## Controle

Pakketversie 13 - 21 oktober 2026. De eigen bedankpagina, mailtemplate-instelling, lokale bestanden en de verzendlogica zijn technisch gecontroleerd. De eerder verwijderde privacystukken blijven verwijderd. De tien beleids-PDF’s, bestaande beelden, huisstijl en domeinkoppeling zijn meegenomen. De vernieuwde verzendroute moet na de upload met een testbericht worden gecontroleerd. Een visuele browsertest is in de maakomgeving niet beschikbaar.

Deze ZIP wijzigt zelf niets in GitHub. De update wordt openbaar na jouw upload en een geslaagde Pages-publicatie.

Officiële uitleg van de formulierdienst:
https://formsubmit.co/
https://formsubmit.co/documentation
https://formsubmit.co/help
