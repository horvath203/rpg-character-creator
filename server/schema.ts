import { buildSchema } from 'graphql';
import { ObjectType, Field, ID, buildSchemaSync } from 'type-graphql';
import { prisma } from './db';
import { Character } from './interfaces'



const apiSchema = buildSchema(`
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
    charList: async ({owner}: Character, context: any) => {

        return await prisma.character.findMany({
            where: {
                ownerId: owner,
            },
        })
    },
    character: async ({id, /*owner*/}: Character, context: any) => {
        return await prisma.character.findUnique({
            where: {
                charId: id,
                //ownerId: owner,
            },
        })
    },
    userById: async (userId: number, context: any) => {
        return await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })
    }
};




const mutation = {
    addCharacter: async ({ owner, name, age, origin, backstory } : Character, context: any ) => {
        const character = await prisma.character.create({
            data:{
                ownerId: owner,
                name: name,
                age: age,
                origin: origin,
                backstory: backstory,
            },
        })
        return{
            data: character,
            ok: true,
            error: ''
        }
    },

    updateCharacter: async ({ id, /*owner,*/ name, age, origin, backstory }: Character, context: any ) => {
        let character = await prisma.character.findUnique({
            where: {
                charId: id,
            },
        })
        if(character == null){
            return {
                data: null,
                ok: false,
                error: 'Character not found'
            };
        }
        if (name) character.name = name
        if (age) character.age = age
        if (origin) character.origin = origin
        if (backstory) character.backstory = backstory

        await prisma.character.update({
            where: {charId: character.charId},
            data: {
                name: character.name,
                age: character.age,
                origin: character.origin,
                backstory: character.backstory,
            },
        })

        return {
            data: character,
            ok: true,
            error: ''
        };
    },

    deleteCharacter: async ({ id, /*owner*/ }: Character, context: any) => {
        try {
            const character = await prisma.character.delete({
                where: {
                    charId : id,
                },
            })
            return {
                data: character,
                ok: true,
                error: ''
            }
        }catch(error: any){
            return {
                data: null,
                ok: false,
                error: 'Character not found'
            };
        }
    },
    createUser: async (username: string, email: string, context: any) => {
        const user = await prisma.user.create({
            data:{
                name: username,
                email: email
            },
        })
        return{
            data: user,
            ok: true,
            error: ''
        }
    },
    editUser: async (userId: number, email: string, context: any) => {
        let user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })
        if(user == null){
            return {
                data: null,
                ok: false,
                error: 'Character not found',
            };
        }
        await prisma.user.update({
            where: {id: userId},
            data: {
                email: email
            },
        })
        return{
            data: user,
            ok: true,
            error: '',
        }
    }
};



const resolvers = {
    ...query, ...mutation,
};


export const resolver = resolvers;
export const schema = apiSchema;