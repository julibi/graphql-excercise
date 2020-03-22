import React, { Component } from 'react'
import { withApollo, Query } from 'react-apollo';
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

export class Book extends Component {
  constructor(props) {
    super(props);
    this.renderBook = this.renderBook.bind(this);
  }

  renderBook(data) {
    const { book: { volumeInfo, selfLink } } = data;
    console.log('volumeInfo', volumeInfo)
    return(
      <div>
        <h1>{volumeInfo.title}</h1>
        <img src={volumeInfo.imageLinks.thumbnail}/>
        {/* how do I show multiple authors and put an "and" between names? */}
        <h3></h3>
      </div>
    );
  }

  render() {
    const { id : ISBN} = this.props.match.params;
    // TODO
    // STYLE IT NICELY
      // skeleton… whitout React-loading-skeleton
    // Transform with Typescript
    // SETUP test and write tests

    return (
      <div>
        <Query query={ BOOK_QUERY } variables={{ ISBN }}>
          { ({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            return this.renderBook(data);
          }
          }
        </Query>
      </div>
    )
  }
}

export default withApollo(Book);
