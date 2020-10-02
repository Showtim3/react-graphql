import React from 'react';
import {graphql} from "@apollo/client/react/hoc";
import {addBookMutation, getAuthorsQuery, getBooksQuery} from "../queries/queries";
import {compose} from "recompose";

class AddBook extends React.Component {
    constructor(props) {
        super(props);
    }

    dispatchMutation = () => {
        this.props.addBookMutation({
            variables: {
                name: 'Batman',
                genre: 'Avengers',
                authorId: "10"
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }

    render() {
        return <div>
            <h3>
                Hello from add book.
            </h3>
            <button onClick={this.dispatchMutation}>
                Add Book
            </button>
        </div>
    }
}

export default compose(graphql(getAuthorsQuery, {name: "getAuthorsQuery"}), graphql(addBookMutation, {name: "addBookMutation"}))(AddBook);
