import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient();

const app = express()
app.use(express.json())
app.use(cors())



app.post('/usuarios', async (req, res)=>{
    
    const {name, email, age} = req.body
    
   await prisma.user.create({
        data:{
            email: email,
            age: age,
            name: name
        }
    })
    

    res.status(201).json(req.body);

})

app.get('/usuarios',async (req,res)=>{

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.put('/usuarios/:id',  async(req, res)=>{
    
    
    
   await prisma.user.update({
    where:{
        id:req.params.id
    },
        data:{
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })
    

    res.status(201).json(req.body);

})

app.delete('/usuarios/:id', async(req, res)=>{

    await prisma.user.delete({
        where:{ 
            
           id: req.params.id

        }
    })
    res.status(200).json({message: "Usuário deletado com sucesso!"});
})


app.listen(3000, ()=>{
    console.log("Servidor iniciado")
});


//kaianvs12 c0icQ7Us1WrL0Ejz