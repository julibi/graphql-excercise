import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const TESTBOOK_QUERY = gql`
  query testbookQuery {
    testbook {
      volumeInfo {
        title,
        authors,
        publisher
      },
      searchInfo {
        textSnippet
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
    data: {}
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { data } = await this.props.client.query({
      query: TESTBOOK_QUERY
    });

    console.log(testbook);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search for book:
            <input value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
          {/* <Query query={TESTBOOK_QUERY}>
          {
            ({loading, error, data}) => {
              if(loading) return <h4>Loading...</h4>;
              if(error) console.log(error);
              if(data) console.log(data);
              return <h1>SUCCESS</h1>;
            }
          }
        </Query> */}
      </div>
    )
  }
}

export default withApollo(Books);
