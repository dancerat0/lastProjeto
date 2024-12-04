async function iniciar() {
    const filmes = await fetch('./php/movie_listar.php').then(res => res.json());
    const corpo = document.getElementById('corpoTabela');

    corpo.innerHTML = '';
    filmes.forEach(filme => {
        corpo.innerHTML += `
            <tr>
                <td>${filme.id}</td>
                <td>${filme.title}</td>
                <td>${filme.year}</td>
                <td>${filme.genre}</td>
                <td><img src="${filme.poster}" style="width: 50px;"></td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target="#modalAdicionarFilme" class="btn btn-warning" onclick="procuraFilme(${filme.id})">Edit</button>
                    <button class="btn btn-danger" onclick="excluirFilme(${filme.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

async function procuraFilme(id) {
    try {
        const filme = await fetch(`./php/movie_selecionar.php?id=${id}`).then(res => res.json());

        document.getElementById('movieTitle').value = filme.title;
        document.getElementById('movieYear').value = filme.year;
        document.getElementById('movieGenre').value = filme.genre;
        document.getElementById('moviePoster').src = filme.poster;
    } catch (error) {
        console.error('Erro ao buscar filme:', error);
        alert('Não foi possível buscar os dados do filme.');
    }
}

async function importarFilmes() {
    const title = document.getElementById('movieSearch').value;
    const res = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=7111638c`).then(res => res.json());

    if (res.Response === "False") {
        alert("Movie not found!");
        return;
    }

    await fetch(`./php/movie_inserir.php?title=${res.Title}&year=${res.Year}&genre=${res.Genre}&poster=${res.Poster}`);
    alert("Movie imported successfully!");
    iniciar();
}

async function excluirFilme(id) {
    if (confirm("Are you sure you want to delete this movie?")) {
        await fetch(`./php/movie_excluir.php?id=${id}`);
        alert("Movie deleted successfully!");
        iniciar();
    }
}

async function limparBanco(){
    if(confirm("Deseja realmente limpar todos os dados?")){
        await fetch('php/movie_limpar.php');
        alert("Banco de Dados Limpo com Sucesso!")
    }
    iniciar()
}

async function listarLogs() {
    try {
        const response = await fetch('php/log_listar.php');
        const logs = await response.json();

        const logTableBody = document.getElementById('logTableBody');
        logTableBody.innerHTML = '';

        logs.forEach(log => {
            logTableBody.innerHTML += `
                <tr>
                    <td>${log.idlog}</td>
                    <td>${new Date(log.datahora).toLocaleString()}</td>
                    <td>${log.numeroregistros}</td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Erro ao listar logs:', error);
        alert('Erro ao carregar logs.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    listarLogs();
});



