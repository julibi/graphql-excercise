import React, { Component } from 'react'
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';


const BOOK_QUERY = gql`
  query bookQuery($ISBN: String) {
    book(ISBN: $ISBN) {
      selfLink
      volumeInfo {
        title,
        authors,
        publishedDate,
        publisher,
        imageLinks {
          thumbnail,
          smallThumbnail
        },
        industryIdentifiers {
          identifier
        }
      },
      searchInfo {
        textSnippet
      },
      language
    }
  }`
;

// here I can use the QUERY tag

export class Book extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        TEST
      </div>
    )
  }
}

export default withApollo(Book);
