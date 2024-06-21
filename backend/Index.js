const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')
const express  = require('express')

const app = express();
app.use(express.json())
app.use(cors());

app.get('/kudoCard', async (req, res) =>{
    const kudoCard = await prisma.kudoBoard.findMany()
    //res.status(200).json(kudoCard)

    const { search } = req.query;
    console.log(search)
    if (search) {
        const filteredKudoCard = kudoCard.filter(card =>{
            const searchText = search.toLowerCase();
            const titleMatch = card.title.toLowerCase().includes(searchText);
            const descriptionMatch = card.description.toLowerCase().includes(searchText);
            const authorMatch  = card.author.toLowerCase().includes(searchText);
            return titleMatch || descriptionMatch || authorMatch;
        });
        res.status(200).json(filteredKudoCard);     
    }else {
        res.status(201).json(kudoCard);
    }
})

app.get('/kudoCard/:id', async (req,res) =>{
    const {  id  } = req.params
    const kudocards = await prisma.kudoBoard.findUnique(
        {
            where: {id:parseInt(id)},
        });
    res.status(200).json(kudocards);

    
});

app.post('/kudoCard', async (req,res)=>{
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

app.delete('/kudoCard/:id', async (req,res)=>{
    const { id } = req.params;

    try{
        const deleteKudoCards = await prisma.kudoBoard.delete({
            where : {id : parseInt(id)}
        })
        res.status(201).json(deleteKudoCards);
    }catch(error){
        console.log(error);
    }

})

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
});
// module.exports = app;