document.getElementById('searchButton').addEventListener('click', function() {
    const word = document.getElementById('wordInput').value;
    const resultDiv = document.getElementById('result');
    
    if (!word) {
        resultDiv.innerHTML = '<p>Please enter a word.</p>';
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Word not found');
            }
            return response.json();
        })
        .then(data => {
            const definitions = data[0].meanings.map(meaning => {
                return meaning.definitions.map(def => `<li>${def.definition}</li>`).join('');
            }).join('<ul>') + '</ul>';
            
            resultDiv.innerHTML = `
                <h2>${data[0].word}</h2>
                <p>Part of speech: ${data[0].meanings.map(meaning => meaning.partOfSpeech).join(', ')}</p>
                <h3>Definitions:</h3>
                ${definitions}
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p>${error.message}</p>`;
        });
});
