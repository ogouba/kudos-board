const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')
const express  = require('express')
const app = express();
app.use(express.json())
app.use(cors());
// getting kudo boards
app.get('/kudoBoard', async (req, res) =>{
    const kudoBoard = await prisma.kudoBoard.findMany()

    const { search } = req.query;
    console.log(search)
    if (search) {
        const filteredKudoBoard = kudoBoard.filter(card =>{
            const searchText = search.toLowerCase();
            const titleMatch = card.title.toLowerCase().includes(searchText);
            const descriptionMatch = card.description.toLowerCase().includes(searchText);
            const authorMatch  = card.author.toLowerCase().includes(searchText);
            return titleMatch || descriptionMatch || authorMatch;
        });
        res.status(200).json(filteredKudoBoard);     
    }else {
        res.status(201).json(kudoBoard);
    }
})
//getting kudo boards with id
app.get('/kudoBoard/:id', async (req,res) =>{
    const {  id  } = req.params
    const kudoBoard = await prisma.kudoBoard.findUnique(
        {
            where: {id:parseInt(id)},
        });
    res.status(200).json(kudoBoard);    
});
// creating kudo baords
app.post('/kudoBoard', async (req,res)=>{
    const { imageUrl,title, category, description, author } = req.body;
    console.log(imageUrl, title, category, description, author)
    const newKudosBoard = await prisma.kudoBoard.create({
        data: {
            imageUrl,
            title,
            category,
            description,
            author
        }
    })
    res.status(201).json(newKudosBoard);
})
// delete kudo boards
app.delete('/kudoBoard/:id', async (req,res)=>{
    const { id } = req.params;

    try{
        const deleteKudoBoard = await prisma.kudoBoard.delete({
            where : {id : parseInt(id)}
        })
        res.status(201).json(deleteKudoBoard);
    }catch(error){
        console.log(error);
    }

})
//  post kudo cards
app.post('/kudoCard', async (req,res)=>{
    const { kudoBoardId, title, gifUrl, author } = req.body;
    console.log( kudoBoardId, title, gifUrl, author)
    const newKudoCard = await prisma.kudoCard.create({
        data: {      
            kudoBoardId,
            title,
            gifUrl,
            author,
            likes:0
        }
    })
    res.status(201).json(newKudoCard);
})
// get kudo cards
app.get('/kudoBoard/:id/kudoCard', async (req,res) => {
    const { id } = req.params;

    const kudoCards = await prisma.KudoCard.findMany({where : {kudoBoardId : parseInt(id)}})
    res.status(200).json(kudoCards)
});
// delete kudo cards 
app.delete('/kudoCard/:id', async (req,res)=>{
    const { id } = req.params;

    try{
        const deleteKudoCard = await prisma.kudoCard.delete({
            where : {id : parseInt(id)}
        })
        res.status(201).json(deleteKudoCard);
    }catch(error){
        console.log(error);
    }
})
// upvote function for kudocards
app.put('/kudoCard/:id', async(req,res)=>{
    const { kudoBoardId, title, gifUrl, author , likes} = req.body;
    const { id } = req.params;
    console.log( kudoBoardId, title, gifUrl, author)
    const newKudoCard = await prisma.kudoCard.update({
        where : {id : parseInt(id)},
        data: {      
            kudoBoardId,
            title,
            gifUrl,
            author,
            likes,
        }
    })
    res.status(200).json(newKudoCard);
})
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
});
