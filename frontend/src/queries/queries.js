import {gql} from '@apollo/client';

const getAuthorsQuery = gql`
{
    authors {
        name
        age
        id
    }
}
`

const getBooksQuery = gql`
{
    books {
        name
        id
    }
}
`

const addBookMutation = gql`
mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
        name
        genre
        authorId
        id
        }
    }
`

const getBookQuery = gql`
    query($id: ID){
        book(id: $id){
            id
            name
            genre
            authorId
        }
    }
`

export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery}
