BANANA - Trading: Frontend
========================================

# Krav 2: Frontend
Till frontend-delen har jag valt att använda ramverket React, detta då jag sedan tidigare använt ramverket till redovisningssidan och ville forstätta att förkovra mig i detta.

## Sidan består av 4 delar:

## Del 1 - trading.holmersson.se/price (även del av Krav 3: Realtid)
Sidan du möts av är realtidspriserna på bananerna. Sidan visar två grafer en med det lägsta säljpriset och en med det högsta säljpriset. Denna del är publik och vilken användare som kan komma åt denna del.
För denna del hade jag stora bekymmer att få igång på produktionsserven. Modulpaketen som används för att visualisera diagramen (Rickshaw) verkar inte kunna minifieras med det verktyg som React använder för att skapa produktionsfilerna.

## Del 2 - trading.holmersson.se/user/login
För att komma åt övriga delar på sidan måste användaren logga in. På serversidan används bcrypt för hantera lösenordskrypteringen och om godkänd inloggning retuneras en JWT för fortsatt identifiering.
För test kan kontot **admin@admin.com** med lösenordet **admin** användas.

## Del 3 - trading.holmersson.se/user
På denna sida kan den inloggade användare se sin aktuella status gällande hur mycket pengar hen har på kontot, sitt egna lager som finns ute till försäljning och det försäljningspris han begär. På denna sidan kan hen även göra en insättning (det förutsätts att hen redan har ett registrerat kontokort), man har också möjlighet att justera sitt försäljningspris.

## Del 4 - trading.holmersson.se/trade
På denna sida sköts själva tradingen, man ser alla användare som har ett lager av bananer. Obs en nyregistrerad användar måste först göra en insättning och därefter köpa ett gäng bananer från någon annan för att synas i denna tabell.

För att handla väljer man bara den kvantitet man vill köpa och trycker på knappen 'Buy'.
