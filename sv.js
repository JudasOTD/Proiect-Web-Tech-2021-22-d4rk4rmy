// Importarea modulelor
const bodyParser = require('body-parser')
const express = require('express')
const jsonfile = require("jsonfile");
const cors = require("cors");
const app = express()

// Parseaza date ca json prin middleware
app.use(express.json()) 
app.use(bodyParser.json())

app.use(express.json({extended:true})) // Parsare requesturi sub encoding UTF8 

app.use(cors({
    origin: "http://localhost:3000"
}))

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

// GET - returneaza lista de proiecte
app.get('/projects', (req, res) => {
    const file = jsonfile.readFileSync("./data.json");

    res.status(200).send(file.projects);
})

// POST - creeaza un proiect
app.post('/project', (req, res) => {
    const file = jsonfile.readFileSync("./data.json");

    // se aleg utilizatorii studenti care pot vota
    const random = file.users.filter(x => x.role == "STUDENT").sort(() => .5 - Math.random()).slice(0,3);

    // ia id-ul ultimului proiect si il incrementeaza cu 1
    const id = file.projects[file.projects.length - 1].id + 1

    // adaug in vectorul de proiecte noul proiect
    file.projects.push({
        ...req.body,
        id,
        // vectorul de note, initializat cu note de 0, deoarece nu au fost setate
        notes: random.map(x => {
            return {
                user: x.email,
                note: 0
            }
        }),
        // livrabile gol, pentru ca nu au fost adaugate livrabile
        livrabile: []
    });

    jsonfile.writeFileSync("./data.json", file);

    res.status(201).send();
})

// GET - proiect dupa id
app.get('/project/:id', (req, res) => {
    const file = jsonfile.readFileSync("./data.json");

    // cauta proiectul
    const project = file.projects.find(x => x.id == req.params.id);

    if (!project) {
        return res.status(404).send();
    }

    res.status(200).send(project);
})

// GET - livrabilele unui proiect dupa id
app.get('/project/livrabile/:id', (req, res) => {
    const file = jsonfile.readFileSync("./data.json");

    const project = file.projects.find(x => x.id == req.params.id);

    if (!project) {
        return res.status(404).send();
    }

    res.status(200).send(project.livrabile);
})

// GET - livrabil dupa id al unui proiect
app.get('/livrabil/:proiectid/:id', (req, res) => {
    const file = jsonfile.readFileSync("./data.json");

    const project = file.projects.find(x => x.id == req.params.proiectid);

    if (!project) {
        return res.status(404).send();
    }

    const livrabil = project.livrabile.find(x => x.id == req.params.id)

    if (!livrabil) {
        return res.status(404).send();
    }

    res.status(200).send(livrabil);
});

// POST - creeaza livrabil la proiect
app.post("/livrabil/:proiectid", (req, res) => {
    const file = jsonfile.readFileSync("./data.json");

    // cautam pozitia proiectului in vector
    const projectId = file.projects.findIndex(x => x.id == req.params.proiectid);

    if (projectId == -1) {
        return res.status(404).send();
    }


    // setarea id-ului
    let id;

    // daca nu exista livrabile pe proiect, atunci id va lua valoarea 1
    if (file.projects[projectId].livrabile.length == 0) {
        id = 1
    } else {
        // in caz contrar o sa iau ultimul livrabil si o sa incrementez id-ul cu 1
        id = file.projects[projectId].livrabile[file.projects[projectId].livrabile.length - 1].id + 1;
    }

    // adaug livrabilul la vectorul de livrabile
    file.projects[projectId].livrabile.push({
        // name, description, video
        ...req.body,
        id: id,
        date: new Date(),
        completed: false
    });

    jsonfile.writeFileSync("./data.json", file);

    res.status(200).send();
})

// POST - noteaza proiect
app.post("/note/:id", (req, res) => {
    const file = jsonfile.readFileSync("./data.json");

    const projectId = file.projects.findIndex(x => x.id == req.params.id);

    if (projectId == -1) {
        return res.status(404).send();
    }


    // mail-ul este trimis ca si header din frontend, si este folosit pentru a autoriza utilizatorii
    const email = req.get("X-Email")

    // cauta nota utilizatorului
    const notaId = file.projects[projectId].notes.findIndex(x => x.user == email)

    // daca utilizatorul nu poate vota
    if (notaId == -1) {
        return res.status(404).send();
    }

    // pune nota
    file.projects[projectId].notes[notaId].note = req.body.note;

    jsonfile.writeFileSync("./data.json", file);

    res.status(200).send();
});

// GET - login
app.get("/status", (req, res) => {
    const file = jsonfile.readFileSync("./data.json");

    const email = req.get("X-Email")
    const password = req.get("X-Password")

    console.log(email, password)

    // se cauta utilizatorul dupa mail si parola
    const user = file.users.find(x => x.email == email && x.password == password)

    if (!user) {
        // 403 - neautorizat
        return res.status(403).send();
    }

    res.status(200).send(user)
})