# Kleine Vleugels - contact via Web3Forms

Versie 14. Deze overstap vervangt de eerdere formulierdienst door Web3Forms. Ouders vullen ons eigen formulier in en gaan na bevestigde verwerking naar onze eigen bedankpagina.

## Uploaden naar GitHub

De koppeling bevat jullie publieke Web3Forms-access key. Die sleutel is een openbaar formulier-ID voor de ontvangst van berichten, geen geheime serversleutel. De ontvangende mailbox wordt in jullie Web3Forms-account beheerd.

1. Pak de ZIP uit.
2. Open https://github.com/KleineVleugels/kleine-vleugels-kinderopvang en ga naar het hoogste niveau, waar docs en README.md staan.
3. Kies Add file > Upload files en upload de map docs en README.md over de bestaande bestanden. Verwijderen vooraf is niet nodig.
4. Kies Commit changes en wacht tot GitHub Pages klaar is met publiceren.
5. Open https://kleinevleugels.nl/contact/ en vernieuw de pagina volledig. Verstuur een testbericht en controleer de bedankpagina en ontvangst in Gmail, ook bij spam.

Publicatie blijft main /docs. Het domein en HTTPS blijven gelijk. Dit ZIP-bestand bevat de volledige website, inclusief het logo, de afbeeldingen en de tien beleids-PDF's.

## Werking

De website verstuurt via de gedocumenteerde JSON-API. Er is één verzendknop. De bevestiging opent alleen na een positief antwoord van de dienst. Bij een fout blijven de gegevens staan en verschijnt een directe maillink. Er is geen automatische herhaalde verzending en geen route naar de oude formulierdienst. Er wordt niets verstuurd bij het openen van de pagina. Zonder JavaScript kan het ingestelde formulier rechtstreeks posten en terugkeren naar onze bedankpagina.

Het gratis plan ondersteunt 250 inzendingen per maand. De bevestiging aan ouders staat op het scherm; automatisch antwoorden per e-mail is een betaalde extra en is hier niet ingeschakeld. Controleer in het dashboard ook de gewenste bewaartermijn. De privacypagina noemt de nieuwe dienst.

Technische controles dekken de verzendroute, benodigde configuratie, succes- en foutafhandeling, dubbele klikken, spamveld en bestandsverwijzingen. Op 21 oktober 2026 accepteerde Web3Forms een echt testbericht met jullie sleutel (HTTP 200, success true). Het onderwerp is "Test nieuw contactformulier Kleine Vleugels". Dit bewijst acceptatie door de dienst; ontvangst in Gmail moet door ons worden gecontroleerd. Een visuele browsertest was in de maakomgeving niet beschikbaar. Controleer daarom na de upload ook de verzending vanaf de gepubliceerde website.

Officiële informatie:
https://web3forms.com/pricing
https://docs.web3forms.com/getting-started/installation
https://docs.web3forms.com/getting-started/faq
