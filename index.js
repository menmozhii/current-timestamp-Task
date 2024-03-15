const express = require ('express')
const fs = require('fs')
const app = express()

const PORT = process.env.PORT || 7000
const path = require('path')
const {format}   = require('date-fns');
const folderPath = path.join(__dirname,'files')
// app.use(cors())
app.use(express.json())

// write a api end point to create the text file in particular folder
 //a. content of file should be in current time stamp
// b.filename should be in curent date-time txt

app.post('/create',async (req, res) => {
    const currentTimestamp = format(new Date(),'dd-MM-yyyy-HH-mm-ss');
    const fileName = `${currentTimestamp}.txt`;
    const filePath = path.join(folderPath, fileName); 
    fs.writeFile(filePath,currentTimestamp,'utf-8',(err)=>{
        if (err) {
            console.error(err);
            res.status(500).send('Error creating file');
        } else {
            console.log('File created successfully');
            res.status(201).send('File created successfully');
        }        
    })
})

app.get('/getFiles',(req,res)=>{
    fs.readdir(folderPath,(err,files)=>{
        if (err) {
            console.log(err)
            res.status(500).send('Error Retrirving the Files')
        } else {
            console.log('Files loaded Successfully')
            const textFiles = files.filter(file => file.endsWith('.txt'));
            res.status(200).json(textFiles)
        }
    })
})


app.listen(PORT,()=>console.log(`App is listening in ${PORT}`));




