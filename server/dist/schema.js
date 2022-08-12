"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.resolver = void 0;
const graphql_1 = require("graphql");
const db_1 = require("./db");
const apiSchema = (0, graphql_1.buildSchema)(`
    type Query {
        charList(ownerID: Int!): [Character]
        character(charId: ID!): Character
        userById(userId: ID!): User
    }
    type Mutation {
        addCharacter(ownerID: Int!, name: String!, age: Int!, origin: String!, backstory: String!): CharResponse
        updateCharacter(charId: ID!, name: String, age: Int, origin: String, backstory: String): CharResponse
        deleteCharacter(charId: ID!): CharResponse
        createUser(name: String!, email: String): UserResponse
        editUser(id: ID!, email: String!): UserResponse
    }
    type User{
        id:         ID!
        name:       String!
        email:      String
        characters: [Character]
    }
    type Character {
        charId: ID!
        owner: User
        ownerID: Int!
        name: String!
        age: Int!
        origin: String!
        backstory: String!
    }
    type CharResponse {
        data: Character
        error: String
        ok: Boolean
    }
    type UserResponse{
        data: User
        error: String
        ok: Boolean
    }
`);
const query = {
    charList: ({ owner }, context) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.character.findMany({
            where: {
                ownerId: owner,
            },
        });
    }),
    character: ({ id, /*owner*/ }, context) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.character.findUnique({
            where: {
                charId: id,
                //ownerId: owner,
            },
        });
    }),
    userById: (userId, context) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    })
};
const mutation = {
    addCharacter: ({ owner, name, age, origin, backstory }, context) => __awaiter(void 0, void 0, void 0, function* () {
        const character = yield db_1.prisma.character.create({
            data: {
                ownerId: owner,
                name: name,
                age: age,
                origin: origin,
                backstory: backstory,
            },
        });
        return {
            data: character,
            ok: true,
            error: ''
        };
    }),
    updateCharacter: ({ id, /*owner,*/ name, age, origin, backstory }, context) => __awaiter(void 0, void 0, void 0, function* () {
        let character = yield db_1.prisma.character.findUnique({
            where: {
                charId: id,
            },
        });
        if (character == null) {
            return {
                data: null,
                ok: false,
                error: 'Character not found'
            };
        }
        if (name)
            character.name = name;
        if (age)
            character.age = age;
        if (origin)
            character.origin = origin;
        if (backstory)
            character.backstory = backstory;
        yield db_1.prisma.character.update({
            where: { charId: character.charId },
            data: {
                name: character.name,
                age: character.age,
                origin: character.origin,
                backstory: character.backstory,
            },
        });
        return {
            data: character,
            ok: true,
            error: ''
        };
    }),
    deleteCharacter: ({ id, /*owner*/ }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const character = yield db_1.prisma.character.delete({
                where: {
                    charId: id,
                },
            });
            return {
                data: character,
                ok: true,
                error: ''
            };
        }
        catch (error) {
            return {
                data: null,
                ok: false,
                error: 'Character not found'
            };
        }
    }),
    createUser: (username, email, context) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db_1.prisma.user.create({
            data: {
                name: username,
                email: email
            },
        });
        return {
            data: user,
            ok: true,
            error: ''
        };
    }),
    editUser: (userId, email, context) => __awaiter(void 0, void 0, void 0, function* () {
        let user = yield db_1.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (user == null) {
            return {
                data: null,
                ok: false,
                error: 'Character not found',
            };
        }
        yield db_1.prisma.user.update({
            where: { id: userId },
            data: {
                email: email
            },
        });
        return {
            data: user,
            ok: true,
            error: '',
        };
    })
};
const resolvers = Object.assign(Object.assign({}, query), mutation);
exports.resolver = resolvers;
exports.schema = apiSchema;
//# sourceMappingURL=schema.js.map