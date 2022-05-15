//const {translateText}=require('./translateFunctions')
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
//const resultTranslated = document.getElementById("resultTranslated");

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
   
  
    
  
  }

  async function getLyricsTranslated(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
   
   try {
    const data = await response.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    translateText(lyrics,'en');
  
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
   } catch (error) {
    result.innerHTML = `<h2>Sorry, there are no lyrics for this song!</h2>`; 
   }
   
  
  }