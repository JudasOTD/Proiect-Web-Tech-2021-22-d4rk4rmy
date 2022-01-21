// Importarea modulelor
const bodyParser = require('body-parser')
const express = require('express')
const res = require('express/lib/response')
const app = express()

// Parsare JSON
app.use(express.json()) 
app.use(bodyParser.json())

app.use(express.json({extended:true})) // UTF8 

// Server config
const PORT = 5500;
app.listen(PORT, () => {
    console.log("API is running... \nListening on port " + PORT)
})

// Default r00t 
app.get('/pro', (req, res) => {
    res.status(202).send(`The D4RK4RMY api. \nLive on port ${PORT}`)
})

// Redirect '/' to root
app.get('/', (req, res) => {
    const q = encodeURIComponent('pro')
    res.redirect('/' + q)
})


// Returneaza toate proiectele inscrise
app.get('/projects', (req,res)=> {
    res.status(200).json(arrayProiecte)
})

// Vizualizati notele si comentariile acordate de jurati unui anumit proiect
//identificabil dupa idProiect. ID-ul juratilor este privat
app.get('/project/:id', (req,res) => {
    const id = req.params.id
    try{
      res.status(201).json(raport(id))  
    } catch {
        res.status(404).send(`Proiectul cu ID#${id} nu exista. Incercati altceva.`)
    }
})

// Un profesor poate vizualiza toate notele acordate tuturor proiectelor
app.get('/projects/prof', (req,res) => {
    var jsonObj = []
    for(let i = 0; i < arrayProiecte.length; i++) {
        const a = raport(arrayProiecte[i].idProiect)
        jsonObj.push(a)
    }
    res.status(200).json(jsonObj)
})

// POST/projects adauga un proiect (validat)
app.post('/project', (req, res)=>{
    console.log('Ruta POST pentru adaugarea de proiecte a fost apelata.')
    try{
       if(req.body.denumire.length === 0 || req.body.denumire === null){
        res.status(406).send("\nNu pot fi create obiecte fără nume.")
    } else  {
        const denumire = req.body.denumire
        const pj = {
        "idProiect" : ++contorGlobal,
        denumire }
        arrayProiecte.push(pj) 
        res.status(201).send("\nProiect inregistrat cu succes.\nIdentificabil dupa ID#" + contorGlobal)
    } 
    } catch(e){
        console.log(e.name)
        res.status(400).send(e.name)
    }
    
    
})

//post/project/:id .  adauga nota si comentariu la proiect

//patch/project/:idJurat editeaza comentariul si nota in cazul in care un jurat vrea asta (trebuie cunoscute credentialele)
//delete/project/:idJurat sterge comment




// Obiecte json cu notele livrabilelor
// Ele pot fi preluate dintr-un fisier
//pentru eficienta in gestionarea intrarilor in urma acordarii de note
const arrayReviews = [
    {idProiect: 1, idJuriu: 10001, nrStelute: 10, comentariu: "Sursa excelenta de date."},
    {idProiect: 2, idJuriu: 10002, nrStelute: 9, comentariu: "documentare pertinenta a instalatiilor"},
    {idProiect: 3, idJuriu: 10020, nrStelute: 4, comentariu: "Angajament respectat in limitele extensiilor."},
    {idProiect: 1, idJuriu: 10025, nrStelute: 10, comentariu: "Puteti migra?"},
    {idProiect: 3,idJuriu: 10032, nrStelute: 1, comentariu: "spamspamspamspamspamspamspam"},
    {idProiect: 2,idJuriu: 10040, nrStelute: 9, comentariu: "treaba bine facuta!!! clientii sunt multumiti"}
]

const arrayProiecte = [
    {idProiect:1, denumire: "Sistem mailing"},
    {idProiect: 2, denumire: "Site cinematografic"},
    {idProiect: 3, denumire: "Test"}
]


var contorGlobal = arrayProiecte.length

const raport = function(ID) {
    //ID este preluat din req.params si transmis sub forma de  string
    //ID trebuie convertit
    var proj = arrayProiecte.find((p) => p.idProiect === parseInt(ID))
    var comm = arrayReviews.filter(function(obj) {
        return obj.idProiect === parseInt(ID)
    })
 
    var note = new Array()
    var comentarii = new Array()
    for(let i = 0; i < comm.length; i++) {
        note.push(comm[i].nrStelute)
        comentarii.push(comm[i].comentariu)
    }

    const raport = {
        "idProiect" : ID,
        "denumire" : proj.denumire,
        "note" : note,
        "comentarii" : comentarii
    }
    return(raport)
}
