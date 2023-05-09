# Helsinki App

## Tietoa projektista
Helsinki App on iOS-laitteille suunniteltu mobiilisovellus, jossa voi tarkastella Helsingin kaupungin tapahtumia. Tapahtumien data haetaan [Helsinki Linked Events APIsta](https://api.hel.fi/linkedevents/v1/).
Tapahtumia voi selata kategorioittain Kategoriat-sivulla tai hakea hakusanalla Haku-sivulla. Tapahtumat näytetään listana, ja tapahtuman nimeä painamalla näkee tapahtumasta lisätietoa. Tapahtuman sivulla Sijaintitiedot-painiketta painamalla näkee tapahtumapaikan tiedot ja osoitteen, ja sijainti näkyy myös kartalla.
Sovellukseen voi myös luoda käyttäjätilin omalla sähköpostiosoitteellaan. Kirjautumalla sisään kiinnostavia tapahtumia voi lisätä suosikeiksi painamalla tapahtuman nimen viereistä tähteä. Omat suosikkitapahtumat näkyvät listana Suosikit-sivulla. Tapahtuman voi poistaa suosikeista painamalla tähteä uudestaan.
Sovellus on tehty Haaga-Helian mobiiliohjelmointikurssin lopputyönä.

## Käytetyt teknologiat
Sovelluksessa käytetään seuraavia teknologioita ja kirjastoja:
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Helsinki Linked Events API](https://api.hel.fi/linkedevents/v1/)
- [Firebase Authentication](https://firebase.google.com/docs/auth) (käyttäjien sisäänkirjautuminen ja tunnistaminen)
- [Firebase Realtime Database](https://firebase.google.com/docs/database) (suosikkitapahtumien tallentaminen)
- [React Native Elements](https://reactnativeelements.com/)
- [Material Community Icons](https://pictogrammers.com/library/mdi/)
- [react-native-render-html](https://www.npmjs.com/package/react-native-render-html) (APIn HTML-tunnisteiden kääntäminen)
- [react-native-maps](https://www.npmjs.com/package/react-native-maps) (karttanäkymän näyttäminen)
