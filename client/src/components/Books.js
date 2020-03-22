import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

const BOOKS_QUERY = gql`
  query booksQuery($queryWord: String) {
    books(queryWord: $queryWord) {
      id,
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
      language
    }
  }`
;

export class Books extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    value: '',
    showBooks: false,
    books: null
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
  
    const { value } = this.state;
    const { data } = await this.props.client.query({
      query: BOOKS_QUERY,
      variables: { queryWord: value }
    });
    const { books } = data;

    this.setState({ books });
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search for your book:
            <input value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        { this.state.books && this.state.books.filter(book => book.volumeInfo.industryIdentifiers).map((book) => (
          <Link to={`/book/${book.volumeInfo.industryIdentifiers[0].identifier}`}>
            <div>
              <h3>{ book.volumeInfo.title }</h3>
              <h5>by{ book.volumeInfo.author }</h5>
              <h5>{ book.volumeInfo.publisher }</h5>
              <h5>{ book.volumeInfo.publishedDate }</h5>
            </div>
          </Link>
        )) }
      </div>
    )
  }
}

export default withApollo(Books);
