function getCurrentDatetime() {
  const date = new Date();

  const options = {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const newDateFormat = new Intl.DateTimeFormat('pt-BR', options)
  const formattedDatetime = newDateFormat.format(date).replace(',', '');

  return formattedDatetime;
}

module.exports = { getCurrentDatetime };