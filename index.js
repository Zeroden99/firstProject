const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const User = require('./models/User')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const PORT = process.env.PORT || 5000

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Simple Api',
            description: 'information'
           
        }
    },
    apis: ['index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions)



const app = express()




app.use(express.json())
app.use('/auth', authRouter)
const start  = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Zerod:denyska@cluster0.gi5vs.mongodb.net/first_step?retryWrites=true&w=majority`)
        app.listen(PORT, ()=> console.log(`server start ${PORT}`))
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Server Erroorrr' })
    }
}

start()