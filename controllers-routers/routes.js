const express = require('express')
const router = express.Router()

const Entry = require('../models/entries');

//reads stuff from the file syncronously
const path = __dirname + '/../data.json'
const fs = require('fs');

const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

//const data = JSON.parse(file);

// function to update data.json file
function writeDataJson (updatedData) {
    fs.writeFile(path, JSON.stringify(updatedData, null, 4), 'utf8', err => {
        // if (err) {
        //     console.log('error')
        // } else {
        //     console.log('data saved')
        // }
    })
}

router.route('/')
      .get((req,res) =>{
          const entryData = Entry.all;
          res.status(200).send(entryData);
      })
      .post((req,res) =>{
            const date = dayjs().format('HH:mm, DD-MM-YYYY')
            const newEntry = Entry.create(req.body,date);
            writeDataJson(newEntry)
            res.status(201).send(newEntry[newEntry.length-1]);
      })

router.route('/:id/add')
    .post((req,res) =>{
        const id = Number(req.params.id);
        const comment = req.body;
        const entry = Entry.findById(id);
        console.log(entry)
        const updated = Entry.addReply(entry,comment)
        writeDataJson(updated)
        res.status(201)//.send(updated[id-1])
    })

//update db 
router.route('/:id')
        .get((req,res) =>{
            try{
                const id = Number(req.params.id); //gets the id
                const entry = Entry.findById(id);
                res.send(entry)
            }catch(err){
                res.status(404).send(code);
            }

        })
        // .delete((req,res) =>{
        //     const id = Number(req.params.id);
        //     const newList = Entry.deleteEntry(id)
        //     writeDataJson(newList);
        //     res.status(200).send('entry deleted')
        // })

router.route('/:id/:react')
    .get((req,res) =>{
        const id = Number(req.params.id); //gets the id
        const react = req.params.react; //gets the reaction
        // console.log(id,typeof(react))
        //find entry by id and then modify reaction
        const entry = Entry.findById(id);
        console.log(entry)
        const updated = Entry.changeNumberOf(entry, react)
        //write to file again
        writeDataJson(updated)
        res.status(202).send(entry)
    })



//get specific tweet
//mutliple word title not working -fix later
// router.get('/:title', (req,res) =>{
//     const title = req.params.title;
//     const selectedTweet = Entry.findByTitle(title)
//     res.send(selectedTweet);
// })

module.exports = router;