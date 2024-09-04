const axios = require('axios')
const cheerio = require ('cheerio')
const express = require ('express')
const app = express()

const url = 'https://verokina89.github.io/project-break-dashboard/'

app.get('/', (req, res) => {
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data
            // console.log(html)
            // res.send(html)
            const $ = cheerio.load(html) //recorre l don y lo guarda en esta vaiable $

            // console.log(html)
            
            const pageTitle = $('title').text()
            // console.log(pageTitle)

            const links = [];  //variable que guarda cada enlace en un array
            const imgs = [];

            $('a').each((indice, element)=> {   //llamamos a cheerio utilizamos a .each para recorrer el indice primro y luego el elemento.
                const link = $(element).attr('href') //coge el elemento que  esta dentro de la 'a' la itera y busca el elemento con el atributo hrf y lo q tiene dentro(s el enlace)
                links.push(link) //coge el elemento que  esta dentro de la 'a' y lo sube
            })  //recorre el html con la funcion each en busqueda de lo q indicmos entre parentesis
            
            $('img').each((index, element) => {
                const img = $(element).attr('src')
                imgs.push(img)
            })  //recoge el atributo(src) de las imagenes  saca los datos que contiene source (src).

            // console.log(links)

            res.send(`
              <h1>ViPs Dashboard</h1>
              <h2>Enlces</h2>
              <ul>
                ${links.map(link => `<li><a href="${url}${link}">${link}</a></li>`).join('')}
              </ul>
              <h2>Imagenes</h2>
              <ul>
              ${imgs.map(img => `<li><a href="${url}${img}">${img}</a></li>`).join('')} 
              </ul>
            `
            )  //con el enlace o url accedemos para traer a cada uno de los elaces y las imgs. Y es un modo de ailar a la pagina y sus elementos.
        }
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`El Servidor EXPRESS esta escuchando en el puerto http://localhost:${PORT}`);
})