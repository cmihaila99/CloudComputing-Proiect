# CloudComputing-Proiect

* [Link prezentare](https://youtu.be/prDK1yrjw1Q)

# Documentatie aplicatie

## Introducere
Conform mai multor studii, versurile cântecelor au devenit din ce în ce mai bogate în sensuri. În ultimii ani, conținutul liric al cântecelor a fost folosit ca un indice al normelor, afectului și valorilor în schimbare ale culturii. O tendință specială, recent descoperită, este aceea că versurile cântecelor populare au devenit din ce în ce mai simple în timp. Simplitatea lirică tot mai mare este însoțită de o gamă tot mai mare de opțiuni de melodii noi. În cele din urmă, melodiile mai simple care au intrat în topuri au avut mai mult succes, ajungând pe poziții mai înalte în top, mai ales în anii în care au fost produse mai multe melodii inedite. Rezultatele prezente sugerează că transmiterea culturală depinde de cantitatea de noi alegeri din peisajul informațional.

## Descriere problema
Scopul acestei aplicații este de a facilita afișarea versurilor pentru diverse piese, prin folosirea unui API și a tehnologiilor Cloud pentru traducerea acestora. Căutarea se poate face atât după numele artistului, cât și după numele piesei.
Cloud Computing ne permite să conectăm orice este digital în zilele noastre. Deschide un nou univers de oportunități în ceea ce privește locurile de muncă, aplicațiile, serviciile și platformele pe care le utilizăm. 
Este ușor de înțeles de ce popularitatea Cloud Computing-ului crește an de an. Întreprinderile înțeleg avantajele Cloud Computing-ului și modul în care acestea afectează producția, colaborarea, securitatea și veniturile. O organizație poate evita multe dintre problemele care afectează întreprinderile care se bazează pe tehnologia locală prin utilizarea unei soluții bazate pe cloud.

## Descriere API
#### Lyrics.ohv
API-ul Lyrics.ohv permite cautarea versurilor unei melodii. Request-ul prin intermediul API-ului este facut printr-o functie fetch pe baza URL-ului si /suggest, pentru a sugera piese pe baza numele artistului sau a piesei introduse. 

In continuare avem evenimentul care se declanseaza in momentul in care dam click pe butonul submit si incepe cautarea.
```javascript
const apiURL = "https://api.lyrics.ovh";

// Get Search Value
form.addEventListener("submit", e => {
    e.preventDefault();
    searchValue = search.value.trim();

    if (!searchValue) {
        alert("Attention! You forgot to introduce an artist or a song name");
    } else {
        beginSearch(searchValue);
    }
})
```
Apoi, functia beginsearch() care va incepe cautarea in functie de valorile introduse in inputfield, pe care le va salva ca si elemente de tip JSON. Functia displayData() afiseaza datele obtinute intr-o lista la nivelul careia avem numele astistului, numele piesei si un element de tip span cu textul Get Lyrics la a carui apasare obtinem versurile.
```javascript
// Search function
async function beginSearch(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();

    displayData(data);
    
}

// Display Search Result
function displayData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}
```
URL-ul prin care se pot obține date din website este "https://api.lyrics.ovh/v1/artist/title". Valorile pentru __*artist*__ și __*title*__ sunt preluate in momentul in care se face click pe Get Lyrics, moment in care se declanseaza evenimenul de click al elementului de tip span.

```javascript
//event listener in get lyrics button
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
       // getLyricsTranslated(artist,songTitle)
    }
})
// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
   
   try {
    const data = await response.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
   } catch (error) {
    result.innerHTML = `<h2>Sorry, there are no lyrics for this song!</h2>`; 
   }
```   

#### Cloud Translation API
API-ul de Cloud Transaltion pus la dispozitie de Google Cloud Platform ne permite sa realizam functii de detectare a unei limbi si de traducere pe care le putem utiliza in proiectul nostru. 
Astfel, am definit 2 funtctii in acest scop.
```javascript
const detectLanguage = async (text) => {

    try {
        let response = await translate.detect(text);
        return response[0].language;
    } catch (error) {
        console.log(`Error at detectLanguage --> ${error}`);
        return 0;
    }
}
const translateText = async (text, targetLanguage) => {

    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
};
```
## Flux de date
Fluxul de date este realizat cu ajutorul metodelor de preluare a datelor de la API-ul lyrics.ohv. De asemenea, am realizat o metoda get pentru testarea server-ului. De asemenea, dupa ce se ruleaza comanda node index.js, in browser la adresa localhost:8080 se va deschide fisierul html din folder-ul frontend.
```javascript
app.use('/', express.static('frontend'))

app.get('/', (req, res) => {
  res.send('Hello World!')
});
```
## Capturi ecran aplicație
Interfata aplicatiei consta intr-o pagina ca contine initial doar un input text unde se va introduce numele piesei sau al astistului si un buton pentru cautare.
![Interfata aplicatie](https://github.com/cmihaila99/CloudComputing-Proiect/blob/main/capturi%20aplicatie/interfata.png)
Exemplu de cautare dupa numele artistului, atunci cand se va afisa o lista cu piesele acelui artist.
![Cautare numele artistului-Stray Kids](https://github.com/cmihaila99/CloudComputing-Proiect/blob/main/capturi%20aplicatie/cautare%20dupa%20numele%20artistului.png)
![Cautare numele artistului-Taylor Swift](https://github.com/cmihaila99/CloudComputing-Proiect/blob/main/capturi%20aplicatie/cautare%20dupa%20artist%202.png)
Exemplu de cautare dupa numele piesei, atunci cand se va afisa o lista cu piesele ce au denumirea cautata saau una asemanatoare.
![Cautare numele piesei-Silent Cry](https://github.com/cmihaila99/CloudComputing-Proiect/blob/main/capturi%20aplicatie/cautare%20dupa%20numele%20piesei.png)
Exemplu de afisare versuri, atunci cand cautarea se face fie dupa numele piesei, fie dupa numele artistului.
![Cautare versuri numele piesei](https://github.com/cmihaila99/CloudComputing-Proiect/blob/main/capturi%20aplicatie/afisare%20vesruri%20dupa%20numele%20piesei.png)
![Cautare versuri numele artistului](https://github.com/cmihaila99/CloudComputing-Proiect/blob/main/capturi%20aplicatie/afisare%20dupa%20artist%202.png)
In final, avem un exemplu al interfetei atunci cand nu sunt gasite versurile piesei.
![Nu exista versurile piesei-Maniac](https://github.com/cmihaila99/CloudComputing-Proiect/blob/main/capturi%20aplicatie/nu%20au%20fost%20gasite%20versurile.png)

## Referinte
* [Articol despre versurile cantecelor](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0244576)
* [Articol importanta Cloud Computing](https://www.globaldots.com/resources/blog/cloud-computing-benefits-7-key-advantages-for-your-business/)
* [Lyrics.ohv API](https://lyricsovh.docs.apiary.io/#)
* [Cloud Translation API](https://cloud.google.com/translate)
* [Cloud Translation documentation](https://medium.com/analytics-vidhya/how-to-use-google-cloud-translation-api-with-nodejs-6bdccc0c2218)
