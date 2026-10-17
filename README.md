# 🇵🇱 Polska Stacja *Craft (`craft.lmk.one` / `pl.lmk.one`)

Polski portal i interaktywna stacja robocza zbierająca w jednym miejscu wszystkie spolszczone aplikacje webowe oraz natywne z rodziny **\*Craft**.

## 🌐 Adresy portalu
- **https://craft.lmk.one/** (`https://lmk.one/craft`)
- **https://pl.lmk.one/** (`https://lmk.one/pl`)

---

## 🚀 Zebrane polskie aplikacje webowe (Oryginalne nazwy)

| Oryginalna nazwa | Odpowiednik | Polskie adresy Web | Liczba fraz PL |
| :--- | :--- | :--- | :--- |
| **VectorCraft** | Adobe Illustrator / CorelDRAW (`.cdr`) | [corel.lmk.one](https://corel.lmk.one/) • [vectorcraft.lmk.one](https://vectorcraft.lmk.one/) • [?new](https://corel.lmk.one/?new) | **4 653** |
| **PhotoCraft** | Adobe Photoshop (`.psd`) | [photocraft.lmk.one](https://photocraft.lmk.one/) | **3 744** |
| **WordCraft** | Microsoft Word (`.docx`) | [wordcraft.lmk.one](https://wordcraft.lmk.one/) | **2 624** |
| **GridCraft** | Microsoft Excel (`.xlsx`) | [excel.lmk.one](https://excel.lmk.one/) • [gridcraft.lmk.one](https://gridcraft.lmk.one/) | **541** |
| **FilmCraft** | Adobe Premiere Pro (`.fcproj`, `.mp4`) | [film.lmk.one](https://film.lmk.one/) • [?webgl](https://film.lmk.one/?webgl) | **477** |
| **DeckCraft** | Microsoft PowerPoint (`.pptx`) | [powerpoint.lmk.one](https://powerpoint.lmk.one/) | **251** |

---

## 💡 Wątek przewodni: Dlaczego wszystko po polsku? (Wspomnienie „Jajka Polskiego”)

Strona jest w wersji **PL** i wszystko na tej stronie oraz w aplikacjach robimy po polsku — **wraz z możliwościami przerobu człowieka**. Bo fajnie, jak wszystko jest po polsku! Kiedyś istniała legendarna polska strona **Jajko Polskie (`jajkopolskie`)**, gdzie można było przeczytać dokumentację jądra Linuksa po polsku. Czasem nie wiadomo, który język wybrać, żeby coś lepiej zrozumieć — dlatego my trzymamy się **PL**.

> **Wytykanie błędów jest bardzo miło traktowane!** Każda uwaga dotycząca tłumaczeń (jak np. pozostawienie naturalnej nazwy **Magenta** zamiast książkowego „karmazynu”) mobilizuje nas do poprawy tłumaczeń i samych aplikacji!

---

## ⚛️ Technologia: React 19 + Vite + Tailwind CSS (Ucz się po polsku!)

Strona została zbudowana w technologii **React 19 + TypeScript + Tailwind CSS**:
- **Rozmiar całej skompilowanej strony:** zaledwie **~380 KB (0,38 MB)** (a po kompresji gzip **~105 KB**!) — startuje błyskawicznie bezpośrednio z **GitHub Pages**, **Cloudflare Pages** (mieści się ponad 60-krotnie poniżej limitu 25 MB!) oraz z lokalnego kontenera **Podman Quadlet** (`127.0.0.1:8771`).
- **Oficjalna polska dokumentacja Reacta:** [https://pl.react.dev/](https://pl.react.dev/)

### Rozwój i przebudowa lokalna
```bash
npm install
npm run build
```
Skrypt `npm run build` buduje paczkę produkcyjną jednocześnie do `dist/web/` (dla lokalnego kontenera Nginx Quadlet) oraz synchronizuje `index.html` i `assets/` do katalogu głównego repozytorium `/` (dla GitHub Pages oraz Cloudflare Pages).
