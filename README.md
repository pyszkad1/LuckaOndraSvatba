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

## 💌 Jak propojit RSVP formulář s Google Tabulkou (přes Google Forms na pozadí)

Hosté vyplní krásný designový formulář přímo na webu a data se na pozadí tiše odešlou do vaší **Google Tabulky**:

### Krok 1: Vytvoření Google Formuláře
1. Otevřete [Google Forms (Formuláře Google)](https://forms.google.com/) a vytvořte nový formulář (např. *„Svatba Lucky a Ondry - RSVP“*).
2. Přidejte 5 otázek (přesně odpovídajících webu):
   - **Vaše Jméno a Příjmení** (Stručná odpověď)
   - **Vaše účast** (Stručná odpověď nebo Výběr z možností: *Ano, s radostí dorazím* / *Bohužel nedorazím*)
   - **Počet osob** (Stručná odpověď nebo Výběr z možností: *1 osoba*, *2 osoby*, atd.)
   - **Dietní omezení / Alergie** (Stručná odpověď)
   - **Vzkaz / Písnička na přání** (Odstavec)
3. V záložce **Odpovědi (Responses)** klikněte na zelenou ikonku **Propojit s Tabulkami (Sheets)** — vytvoří se nová přehledná Google Tabulka.

### Krok 2: Získání URL a ID položek (`entry.XXXXX`)
1. V pravém horním rohu klikněte na tři tečky `⋮` a zvolte **Získat předvyplněný odkaz** (*Get pre-filled link*).
2. Do každého políčka napište zkušební text (např. do jména `JMÉNO`, do účasti `ÚČAST`, do počtu `POČET`, atd.) a dole klikněte na **Získat odkaz** a **Zkopírovat odkaz**.
3. Zkopírovaný odkaz bude vypadat přibližně takto:
   ```text
   https://docs.google.com/forms/d/e/1FAIpQLScXXXXXXXXX/viewform?usp=pp_url&entry.123456789=JMÉNO&entry.987654321=ÚČAST&entry.112233445=POČET&entry.556677889=DIETY&entry.998877665=VZKA Z
   ```

### Krok 3: Vložení do `js/main.js`
V souboru [`js/main.js`](file:///c:/projects/LuckaOndraWebPage/js/main.js) hned nahoře v `GOOGLE_FORM_CONFIG`:
1. Nahraďte `formUrl` za vaši adresu z kroku 2, kde `/viewform?...` změníte na `/formResponse`:
   ```javascript
   formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScXXXXXXXXX/formResponse',
   ```
2. Vložte odpovídající `entry.` čísla do objektu `entries`:
   ```javascript
   entries: {
     name: 'entry.123456789',
     attendance: 'entry.987654321',
     guests: 'entry.112233445',
     dietary: 'entry.556677889',
     note: 'entry.998877665'
   }
   ```
3. Uložte, nahrajte (`git commit & push`) a od té chvíle se každé vyplnění na webu automaticky zapisuje do vaší Google Tabulky!

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
