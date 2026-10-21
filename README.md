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

De browser verstuurt het formulier rechtstreeks naar FormSubmit. Deze route verzorgt ook de eventuele spamcontrole en de activering. Na een geslaagde verzending keert de bezoeker terug op onze bedankpagina. Onze eigen website draait nog steeds via GitHub Pages.

1. Verstuur na de upload zelf een testbericht via de contactpagina.
2. Open Kleinevleugels@gmail.com. Bij het eerste gebruik stuurt FormSubmit een activatiemail. Controleer ook de spammap.
3. Klik in die e-mail op de bevestiging, meestal Activate Form of Confirm your email. Alleen de eigenaar van deze mailbox kan dit afronden.
4. Verstuur daarna nog een testbericht en controleer of de inhoud in Gmail verschijnt. Via Beantwoorden reageer je op het ingevulde e-mailadres.

FormSubmit vraagt geen nieuwe bevestiging wanneer de gebruikte combinatie al is geactiveerd. Controleer in dat geval direct het testbericht. Tot de bevestiging kunnen berichten bij de formulierdienst in afwachting blijven staan; beschouw de koppeling daarom pas als actief na de controle in Gmail.

## Wat ouders zien

Het formulier vraagt om naam, e-mailadres en bericht, met een optioneel telefoonnummer en een keuze voor regio en onderwerp. Na klikken op Verstuur bericht gaat de browser naar FormSubmit. Daar kan een spamcontrole of activeringsbericht verschijnen. Na afronding komt de bezoeker terug op onze bedankpagina. Het formulier schrijft geen gegevens naar browseropslag. De normale formulierverzending werkt ook zonder JavaScript. Er staat daarnaast altijd een directe maillink op de contactpagina.

De eerdere JavaScript-verzending kon na 25 seconden stoppen zonder antwoord van de formulierdienst. In deze versie verzendt JavaScript de gegevens niet meer: de browser verstuurt het formulier rechtstreeks. JavaScript controleert alleen de invoer en voorkomt dubbel klikken. Als je teruggaat naar het formulier wordt de verzendknop weer bruikbaar.

De formulierdienst en de verwerking van contactgegevens staan op de bijgewerkte privacypagina. De bevestiging voor ouders staat op het scherm; een automatische ontvangstmail aan de ouder is in deze uitvoering niet ingesteld.

## Controle

Pakketversie 12 - 21 oktober 2026. De aangewezen stukken op de privacypagina zijn verwijderd. De normale POST-verzending, bescherming tegen dubbel verzenden, verplichte velden, terugkeer na navigatie en lokale bestanden zijn technisch gecontroleerd. De tien beleids-PDF’s, bestaande beelden, huisstijl en domeinkoppeling zijn meegenomen. De formulierdienst is vanuit de maakomgeving niet live te controleren; daadwerkelijke bezorging in Gmail moet na de upload met de activatie en een testbericht door de mailboxeigenaar worden bevestigd. Een visuele browsertest is in de maakomgeving niet beschikbaar.

Deze ZIP wijzigt zelf niets in GitHub. De update wordt openbaar na jouw upload en een geslaagde Pages-publicatie.

Officiële uitleg van de formulierdienst:
https://formsubmit.co/
https://formsubmit.co/documentation
https://formsubmit.co/help
