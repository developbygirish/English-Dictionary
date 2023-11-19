let input = document.querySelector('input');
let info = document.querySelector('.info-txt');
let resultEl = document.querySelector('.result');

async function fetchAPI(word) {
    try {
        info.innerText = `Searching for ${word}....`
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result = await fetch(url).then((res) => res.json());

        info.style.display = 'none';
        resultEl.style.display = 'block'
        if (result.length > 0 && result[0].meanings && result[0].meanings.length > 0) {
            resultEl.innerHTML = `  <h3>Word Title : ${word}</h3>
<p class="meaning">${result[0].meanings[0].definitions[0].definition}
</p>
<audio src="${result[0].phonetics[0].audio}" controls autoplay ></audio>`
        }
        else{
            resultEl.innerHTML=`<h3 style='color:red'> ${result.title}</h3>`
        }

    } catch (error) {
        if(error){
            info.innerText='Check Your Internet.....'
            info.style.color='red'
        }
    }


}


input.onkeyup = e => {
    if (e.target.value && e.key == 'Enter') {
        fetchAPI(e.target.value)
    }
}