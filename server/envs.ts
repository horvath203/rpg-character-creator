import { config } from 'dotenv';

config();
//console.log(process.env);

export default {
    port: process.env.PORT || 5000,
    graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
}