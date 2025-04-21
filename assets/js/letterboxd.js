document.addEventListener('DOMContentLoaded', () => {
    carregarRanking();  // Chama a função para carregar o ranking quando a página for carregada
});

function carregarRanking() {
    // Caminho absoluto do JSON, teste com caminho absoluto
    fetch('assets/json/filmes.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o JSON');
        }
        return response.json();
      })
      .then(rankingData => {
        if (rankingData && rankingData.ranking) {
          mostrarRanking(rankingData.ranking); // Passando diretamente o array de ranking
        } else {
          console.error('Formato de JSON inválido ou dados ausentes');
        }
      })
      .catch(error => {
        console.error('Erro ao carregar o arquivo JSON:', error);
      });
}

function mostrarRanking(ranking) {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = ''; // Limpa a lista antes de adicionar os itens

    ranking.forEach((filme, index) => {
        const li = document.createElement('li');
        li.classList.add('ranking-item');

        // Cria o número do ranking dentro de um círculo
        const rankingNumero = document.createElement('div');
        rankingNumero.classList.add('ranking-numero');
        rankingNumero.innerText = index + 1; // Exibe o número do ranking, ajustado para 1-indexed

        // Cria o poster
        const poster = document.createElement('img');
        poster.classList.add('poster');
        poster.src = filme.poster || 'default-poster.jpg';  // Caso o poster não exista, utiliza um default
        poster.alt = filme.titulo;

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('filme-info');

        // Cria o título do filme
        const titulo = document.createElement('h3');
        titulo.innerText = filme.titulo || 'Título não disponível';

        const avaliacaoDiv = document.createElement('div');
        avaliacaoDiv.classList.add('avaliacao');

        // Função para gerar estrelas
        function gerarEstrelas(nota) {
          const max = 5;
          const notaInteira = Math.floor(Number(nota)); // Parte inteira da nota
          const temMeiaEstrela = (Number(nota) % 1) >= 0.5; // Verifica se tem meia estrela
          let estrelas = '';

          // Adiciona as estrelas inteiras
          for (let i = 1; i <= notaInteira; i++) {
            estrelas += '★';
          }

          // Adiciona a meia estrela se necessário
          if (temMeiaEstrela) {
            estrelas += '½';
          }

          // Adiciona as estrelas vazias para completar até 5
          for (let i = notaInteira + (temMeiaEstrela ? 1 : 0); i < max; i++) {
            estrelas += '';
          }

          return estrelas;
        }

        // Bloco do Lawer
        const lawerBloco = document.createElement('div');
        lawerBloco.classList.add('bloco-avaliacao');

        const lawerNota = document.createElement('div');
        lawerNota.classList.add('nota');
        lawerNota.innerHTML = `Lawer: <span class="estrelas">${gerarEstrelas(filme.avaliacoes?.usuario?.nota || 0)}</span>`;

        const lawerComentario = document.createElement('div');
        lawerComentario.classList.add('comentario');
        lawerComentario.innerHTML = filme.avaliacoes?.usuario?.comentario || 'Sem Comentário';

        lawerBloco.appendChild(lawerNota);
        lawerBloco.appendChild(lawerComentario);

        // Bloco do Apollo
        const apolloBloco = document.createElement('div');
        apolloBloco.classList.add('bloco-avaliacao');

        const apolloNota = document.createElement('div');
        apolloNota.classList.add('nota');
        apolloNota.innerHTML = `Apollo: <span class="estrelas">${gerarEstrelas(filme.avaliacoes?.namorado?.nota || 0)}</span>`;

        const apolloComentario = document.createElement('div');
        apolloComentario.classList.add('comentario');
        apolloComentario.innerHTML = filme.avaliacoes?.namorado?.comentario || 'Sem Comentário';

        apolloBloco.appendChild(apolloNota);
        apolloBloco.appendChild(apolloComentario);

        // Adiciona blocos de avaliação
        avaliacaoDiv.appendChild(lawerBloco);
        avaliacaoDiv.appendChild(apolloBloco);

        // Caixa de comentários
        const comentarioCaixa = document.createElement('div');
        comentarioCaixa.classList.add('comentarios-caixa');

        infoDiv.appendChild(titulo);
        infoDiv.appendChild(avaliacaoDiv);
        infoDiv.appendChild(comentarioCaixa);

        li.appendChild(rankingNumero); // Adiciona o número do ranking no item
        li.appendChild(poster);
        li.appendChild(infoDiv);

        rankingList.appendChild(li);
    });
}
