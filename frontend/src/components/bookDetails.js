import React from 'react';
import {graphql} from "@apollo/client/react/hoc";
import {getBookQuery} from "../queries/queries";

class BookDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("Hello from props");
        console.log(this.props);
        return <div>
            <h3>
                Hello from books details.
            </h3>
        </div>
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {variables: {id: props.bookId}}}})(BookDetails);
