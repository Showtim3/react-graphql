const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;

// graphQLID will accept 1 as well as "1" as valid id's.
const books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
    {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
]

const authors =  [
    {name: 'Patrick Rothfuss', age: 44, id:"1"},
    {name: 'Brandon Sanderson', age: 42, id:"2"},
    {name: 'Terry Pratchett', age: 66, id:"3"},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    // id, name, genre are fields, these are functions because when we have multiple types, it might get complicated without the functions.
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorId: {type: GraphQLID}
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

// root queries are how user can jump to the graph and retrieve data.

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //code to get data from db/other sources
                //ex use args.id
                return books.find(book => book.id === args.id);
            }
        }, author : {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return authors.find(author => author.id === args.id);
            }
        }, books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        }, authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
})

//example
/*
book(id: '123') {
name
genre
}
*/

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = {name: '', age: 0, id:( authors.length + 1).toString()};
                author.name = args.name;
                author.age = args.age;
                authors.push(author);
                return author
            }
        }, addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let book = {name: '', genre: '', authorId: '', id:(books.length + 1).toString()};
                book.name = args.name;
                book.genre = args.genre;
                book.authorId = args.authorId;
                books.push(book);
                return book;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
