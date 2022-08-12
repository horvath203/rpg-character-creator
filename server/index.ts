import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema, resolver } from './schema'

const app = express()

app.use(express.static('./build'))

app.use(
    process.env.graphqlPath,
    graphqlHTTP((request, response, graphQLParams) => ({
        schema,
        rootValue: resolver,
        graphiql: true,
        context:{
            request,
            response,
        },
    }))
)

app.listen(process.env.port, () => console.log(`Running on port ${process.env.port}`))