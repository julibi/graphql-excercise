const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    selfLink: { type: GraphQLString },
    volumeInfo: { type: VolumeInfoType },
    searchInfo: { type: SearchInfoType },
    language: { type: GraphQLString }
  })
});

const VolumeInfoType = new GraphQLObjectType({
  name: 'VolumeInfo',
  fields: () => ({
    title: { type: GraphQLString },
    authors: { type: new GraphQLList(GraphQLString) },
    publisher: { type: GraphQLString },
    publishedDate: { type: GraphQLString },
    pageCount: { type: GraphQLInt },
    industryIdentifiers: { type: new GraphQLList(ISBNType) },
    imageLinks: { type: ImageLinksType }
  })
});

const ImageLinksType = new GraphQLObjectType({
  name: 'ImageLinks',
  fields: () => ({
    smallThumbnail: { type: GraphQLString },
    thumbnail: { type: GraphQLString }
  })
});

const SearchInfoType = new GraphQLObjectType({
  name: 'SearchInfo',
  fields: () => ({
    textSnippet: { type: GraphQLString }
  })
});

const ISBNType = new GraphQLObjectType({
  name: 'ISBNType',
  fields: () => ({
    type: { type: GraphQLString },
    identifier: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      args: {
        queryWord: { type: GraphQLString },
        language: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${args.queryWord}&langRestrict=${args.language}`)
          .then(res => res.data.items)
      }
    },
    book: {
      type: BookType,
      args: {
        ISBN: { type: GraphQLString },
        language: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${args.ISBN}&langRestrict=${args.language}`)
          .then(res => res.data.items[0])
      }
    },
    testbook: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=javascript")
          .then(res => res.data.items)
      }
    }
  }
});

module.exports = new GraphQLSchema({query: RootQuery});

