import React from 'react';
import {graphql} from "@apollo/client/react/hoc";
import {getBooksQuery} from "../queries/queries";
import BookDetails from "./bookDetails";

class BookList extends React.Component {
    constructor(props) {
        super(props);
    }

    displayBooks() {
        var data = this.props.data;
        if(data.loading){
            return (<div>Loading...</div>)
        } else {
            return data.books.map((book) => {
                return (<li key={book.id} >{book.name}</li>);
            })
        }
    }
    render() {
        return <div>
            <h3>
                Hello from books lists.
            </h3>
            {this.displayBooks()}
            <BookDetails bookId="2"/>
        </div>
    }
}

export default graphql(getBooksQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookList);
