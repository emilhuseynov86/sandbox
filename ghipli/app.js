const app = document.querySelector('#app');
const logo = document.createElement('img');
logo.setAttribute('class', 'img-fluid mb-4');
logo.src = 'logo.png';
app.prepend(logo);

async function fetchMovies() {
    try {
        let response = await fetch('https://ghibliapi.herokuapp.com/films');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        const message = `Filmlər haqqında məlumat əldə etmək mümkün olmadı: ${error.message}`;
        let p = document.createElement('p');
        p.setAttribute('class', 'text-danger mt-4 fw-bolder');
        p.textContent = message;
        app.append(p);
    }
}

fetchMovies().then(movies => {
    if (movies) {
        movies.forEach(movie => {
            const col = document.createElement('div');
            col.setAttribute('class', 'col my-3');

            const card = document.createElement('div');
            card.setAttribute('class', 'card h-100 text-dark');

            const cardHeader = document.createElement('div');
            cardHeader.setAttribute('class', 'card-header bg-primary text-center text-light py-4');
            cardHeader.textContent = movie.title;

            const cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body');

            const p = document.createElement('p');
            movie.description = movie.description.substring(0, 300);
            p.textContent = movie.description + '...';

            cardBody.append(p);
            card.append(cardHeader);
            card.append(cardBody);
            col.append(card);
            app.lastElementChild.append(col);
        });
    }
});