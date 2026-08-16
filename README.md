# Svatební web Lucky & Ondry (Chateau St. Havel · 8. 5. 2027)

Tento repozitář obsahuje kompletní, moderní a plně responzivní svatební web připravený pro bezplatné nasazení na **GitHub Pages**.

---

## 🌟 Funkce webu

- **Hero sekce**: Jména snoubenců (*Lucka & Ondra*), datum (*Sobota 8. 5. 2027*), oznámení (*Řekla ANO!*), podtitul (*Velký den pro bridžovou rodinu Bahníků*).
- **Živý odpočet**: Interaktivní odpočítávání dnů, hodin, minut a sekund do svatebního obřadu.
- **Uložení do kalendáře**: Přímý odkaz pro přidání události do Google Kalendáře a stažení standardního `.ics` souboru (Apple Kalendář, Outlook).
- **Příběh & Zásnuby**: Fotografie zásnubního prstýnku s výhledem na skotský viadukt Glenfinnan.
- **Místo konání & Mapa**: Interaktivní Google Mapa lokality *Chateau St. Havel (Praha 4 - Krč)*, odkazy na oficiální web hotelu, Google Mapy a Mapy.cz.
- **Harmonogram dne**: Časová osa s jednotlivými fázemi dne (obřad, hostina, dort, raut, tanec, párty).
- **Fotogalerie s Lightboxem**: Zobrazení společných cestovatelských i narozeninových fotografií (Řím, Madrid, Průhonice, skály, oslavy) s možností rozkliknutí na celou obrazovku.
- **Důležité informace pro hosty**: Dress code se vzorníkem zámeckých barev, svatební dary / QR platba, ubytování na zámku a kontakty.
- **Interaktivní RSVP formulář**: Potvrzení účasti, počet osob, dietní preference a vzkaz.

---

## 🚀 Návod na zprovoznění bezplatného hostingu na GitHub Pages

Nasazení na GitHub Pages je zcela zdarma a zabere přibližně 2 minuty:

### Krok 1: Vytvoření repozitáře na GitHubu
1. Přihlaste se na [GitHub.com](https://github.com).
2. Klikněte na **New repository** (Nový repozitář).
3. Zadejte název repozitáře (např. `svatba-lucka-ondra` nebo `marriage`).
4. Zvolte **Public** a klikněte na **Create repository**.

### Krok 2: Nahrání souborů do repozitáře
V kořenové složce projektu spusťte v terminálu (nebo nahrajte přes GitHub Desktop / webové rozhraní):
```bash
git init
git add .
git commit -m "Initial commit: Lucka and Ondra wedding website"
git branch -M main
git remote add origin https://github.com/<vase-uzivatelske-jmeno>/<nazev-repozitare>.git
git push -u origin main
```

### Krok 3: Aktivace GitHub Pages
1. V repozitáři na GitHubu přejděte do **Settings** (Nastavení) -> v levém sloupci zvolte **Pages**.
2. V sekci **Build and deployment** nastavte:
   - **Source**: `Deploy from a branch`
   - **Branch**: vyberte `main` a složku `/ (root)`
3. Klikněte na **Save**.
4. Během 1–2 minut bude váš web dostupný na adrese:
   ```
   https://<vase-uzivatelske-jmeno>.github.io/<nazev-repozitare>/
   ```

---

## 📁 Struktura souborů

```text
LuckaOndraWebPage/
├── index.html        # Hlavní HTML struktura a obsah
├── css/
│   └── style.css     # Luxusní designový systém, barvy, typografie a responzivita
├── js/
│   └── main.js       # Odpočet, fotogalerie lightbox, RSVP formulář, kalendář
├── pics/             # Dodané fotografie
│   ├── Sure0.jpeg    # Zásnubní prstýnek Glenfinnan
│   ├── Sure1.jpg     # Narozeninový dort
│   ├── Sure2.jpg     # Skalní jezero
│   ├── Sure3.jpg     # Zámecký park Průhonice
│   ├── Sure4.jpg     # Park Retiro Madrid
│   ├── Sure5.jpg     # Oslava s prskavkami
│   └── Sure6.jpg     # Fontana di Trevi Řím
├── text.txt          # Původní zadání a texty
└── README.md         # Tento návod
```
