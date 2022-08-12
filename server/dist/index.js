"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema");
const app = (0, express_1.default)();
app.use(express_1.default.static('./build'));
app.use(process.env.graphqlPath, (0, express_graphql_1.graphqlHTTP)((request, response, graphQLParams) => ({
    schema: schema_1.schema,
    rootValue: schema_1.resolver,
    graphiql: true,
    context: {
        request,
        response,
    },
})));
app.listen(process.env.port, () => console.log(`Running on port ${process.env.port}`));
//# sourceMappingURL=index.js.map