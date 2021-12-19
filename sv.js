// Importarea modulelor
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// Parseaza date ca json prin middleware
app.use(express.json()) 
app.use(bodyParser.json())

app.use(express.urlencoded({extended:true})) // Parsare requesturi sub encoding UTF8 

// Server config
const PORT = 5500;
app.listen(PORT, () => {
    console.log("API is running... \nListening on port " + PORT)
})

// Default r00t 
app.get('/pro', (req, res) => {
    res.status(201).send(`The D4RK4RMY api. \nLive on port ${PORT}`)
})

// Redirect '/' to root
app.get('/', (req, res) => {
    const q = encodeURIComponent('pro')
    res.redirect('/' + q)
})


// Vizualizati toate notele printr-un GET general
app.get('/comments', (req,res) => {
    res.status(200).json(arrayReviews)
})

// Returneaza toate proiectele
app.get('/projects', (req,res)=> {
    res.status(200).json(arrayProiecte)
})


// Vizualizati notele si comentariile acordate de jurati unui anumit proiect
//identificabil dupa idProiect. ID-ul juratilor este privat
app.get('/projects/:id', (req,res) => {
    res.status(200).json(arrayReviews)
})

//post/projects adauga un proiect (validat prin input in SPA.html)

//post/projects/:id .  adauga nota si comentariu la proiect

//patch/projects/:idJurat  editeaza comentariul si nota in cazul in care un jurat vrea asta (trebuie cunoscut id-ul)
//delete/project/:idJurat  sterge  comment



// Obiect json cu notele livrabilelor
// Acesta va fi preluat dintr-un fisier si modelat sub forma unei clase
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
