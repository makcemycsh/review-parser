function arrayToCsv(data: Array<Array<string>>) {
  return data
    .map(
      (row) =>
        row
          .map(String) // convert every value to String
          .map((v) => v.replaceAll('"', '""')) // escape double quotes
          .map((v) => `"${v}"`) // quote it
          .join(',') // comma-separated
    )
    .join('\r\n'); // rows starting on new lines
}

export const downloadCSV = (content: Array<Array<string>>, name: string) => {
  const a = document.createElement('a');
  const mimeType = 'text/csv';
  const fileName = `${name}.csv`;

  if (URL && 'download' in a) {
    a.href = URL.createObjectURL(new Blob([arrayToCsv(content)], { type: mimeType }));
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    location.href = 'data:application/octet-stream,' + encodeURIComponent(arrayToCsv(content)); // only this mime type is supported
  }
};
