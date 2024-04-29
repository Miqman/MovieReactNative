import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovie {
    getMovie {
      id
      title
      imgUrl
      Genre {
        name
      }
    }
  }
`;
export const GET_GENRES = gql`
  query GetGenre {
    getGenre {
      id
      name
    }
  }
`;

export const GET_ONE_MOVIE = gql`
  query Query($getOneMovieId: ID) {
    getOneMovie(id: $getOneMovieId) {
      id
      title
      slug
      synopsis
      trailerUrl
      imgUrl
      rating
      genreId
      authorId
      UserMongoId
      Genre {
        name
      }
      Casts {
        name
        profilePict
      }
      User {
        id
        username
        email
      }
    }
  }
`;
