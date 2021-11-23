# Proiect-Tehnologii-Web-2021-22-d4rk4rmy
Aplicatie Web pentru Acordarea de Note Anonime / 

Arhitectura: Front-End + Back-End
Limbajul de programare folosit in general este Javascript, standardul de numire este camelCase

Exista stocare persistenta intr-o baza de date relationala (?SQLite?)

Front-endul este compus din componente React. Adopta arhitectura SPA (Single-Page-Application) in care utilizatorul interactioneaza cu interfata, iar pagina web este rescrisa dinamic, generand date noi de pe server.

Back-end-ul este un API REST scris in node. Protocolul de comunicatii folosit este HTTP. Sunt implementate cererile http intr-un sistem de rutare a operatiilor de pe site.

Descriere:
==========
Prin intermediul interfetei pot fi inregistrate proiecte carora se ataseaza livrabile (dependente de o data in timp, eg. deadline) si videouri de prezentare, ori un link catre un videoclip. 
Oricine se inregistreaza devine posibil evaluator al altor proiecte. La fiecare data de livrare a oricarui proiect pot fi selectati aleator membri care sa faca parte din juriu (identificabili dupa un id case-insensitive, ori un cookie). 
Fiecare proiect dispune de un juriu. Fiecare membru al acestui juriu este anuntat printr-o notificare de proiectul pe care trebuie sa il noteze. Juriul acorda note intre 1 si 10. Nota finala se calculeaza ca medie cu doua cifre fractionare, excluzand outlierii. Nota este anonima, in sensul ca alti membri nu pot vedea cine voteaza. Interfata de notare vine ca extensie a partii de inscriere a proiectului, si este accesibila doar celor care au fost au fost selectati. Ea este afisata sub formularul de postare a proiectelor.
Este implementat un sistem de permisiuni care ofera membrilor juriului posibilitatea de a modifica notele acordate, intr-un interval predefinit. Utilizatorii standard pot vedea notele, dar nu si cine a votat.
