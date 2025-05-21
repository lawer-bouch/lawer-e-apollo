const eventos = [
  { data: '2025-02-28', descricao: 'Dia em que nos conhecemos' },
  { data: '2025-03-15', descricao: 'Lawer conta para Apollo que gosta dele' },
  { data: '2025-03-23', descricao: 'Apollo pede Lawer em namoro' },
  { data: '2025-05-16', descricao: 'Comprada a passagem para Lawer visitar Apollo' },r
];

const timeline = document.getElementById('timeline');

function formatarData(data) {
  const date = new Date(data);
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

const dataInicial = new Date(eventos[0].data);
const dataFinal = new Date(eventos[eventos.length - 1].data);
const totalDias = (dataFinal - dataInicial) / (1000 * 60 * 60 * 24) || 1;

eventos.forEach(evento => {
  const dataAtual = new Date(evento.data);
  const diasPassados = (dataAtual - dataInicial) / (1000 * 60 * 60 * 24);
  let posicao = (diasPassados / totalDias) * 100;

  posicao = Math.min(Math.max(posicao, 0), 100);

  const ponto = document.createElement('div');
  ponto.classList.add('timeline-event');
  ponto.style.left = `${posicao}%`;

  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.textContent = `${formatarData(evento.data)} — ${evento.descricao}`;

  ponto.appendChild(tooltip);
  timeline.appendChild(ponto);
});
