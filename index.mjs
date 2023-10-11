import { ApolloServer, gql } from 'apollo-server';
import knex from './banco.mjs';

const typeDefs = gql`
    type Aluno{
        id: ID! #!notnull
        ra: Int!
        nome: String!
        email: String!
    }
    type Query {
        aluno(ra: Int!): Aluno! #retorna um aluno
        alunos: [Aluno]! #retorna todos os alunos (array)
    }
    type Mutation {
        createAluno(ra: Int!, nome: String!, email: String!): Aluno!
        deletaAluno(ra: Int!): Aluno!
        updateAluno(id: ID!, ra: Int!, nome: String!, email: String!): Aluno!
    }
`;

const resolvers = {
    Query: {
        alunos: async () => {
            //SELECT * FROM tabela
            return knex("graphQL").select("*");
        },
        alunos: async (_, { ra }) => {
            const bancada = await knex("graphQL").where("ra", ra).first();
            return bancada;
        },
    },

    Mutation: {
        createAluno: async (_, { ra, nome, email }) => {
            await knex("graphQL").insert({ ra, nome, email });
            const novoAluno = await knex("graphQL").where("ra", ra).first();
            return novoAluno;
        }
    },
};

const server = new ApolloServer({ typeDefs, resolvers, });
server.listen().then(({ url }) => {
    console.log(`Servidor GraphQL rodando em ${url}`);
});