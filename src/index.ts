import { CharacterOrigin, Characters, Result } from "./interfaces";
const XMLRequest = require("xmlhttprequest").XMLHttpRequest;

const url: string = 'https://rickandmortyapi.com/api/character/';

const getData = (apiURL: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const request: XMLHttpRequest = new XMLRequest();
    request.onreadystatechange = () => {
      if (request.readyState == 4) {
        if (request.status === 200)
          resolve(request.responseText);
        else {
          reject(request.status)
        }
      }
    };
    request.open('GET', apiURL, true);
    request.send();
  })
};

let response1: Characters,
  response2: Result,
  response3: CharacterOrigin;

getData(url)
  .then((data1) => {
    console.log('Primer Llamado...');
    response1 = JSON.parse(data1);
    const characterUrl = `${url}${response1.results[0].id}`
    return getData(characterUrl);
  })
  .then(data2 => {
    console.log('Segundo Llamado...');
    response2 = JSON.parse(data2);
    return getData(response2.origin.url)
  })
  .then(data3 => {
    response3 = JSON.parse(data3);

    console.log('Tercer Llamado...');
    console.log(`Personajes: ${response1.info.count}`);
    console.log(`Primer Personaje: ${response2.name}`);
    console.log(`Dimensión: ${response3.dimension}`);
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
