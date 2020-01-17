import {
  fetchProductsBegin,
  fetchProductsSuccess,
  fetchProductsFailure
} from "../actions";

export function fetchArticleDetails() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetchPosts().then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchProductsSuccess(json));
      } else {
        dispatch(fetchProductsFailure());
      }
    });
  };
}

function fetchPosts() {
  const URL = `https://jsonplaceholder.typicode.com/comments`;
  return fetch(URL, { method: "GET" }).then(response =>
    Promise.all([response, response.json()])
  );
}
