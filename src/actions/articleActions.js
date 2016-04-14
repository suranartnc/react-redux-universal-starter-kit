require('es6-promise').polyfill();
require('isomorphic-fetch');

const apiURL = `${process.env.HOSTNAME}${process.env.NODE_ENV === 'production' ? '' : ':' + process.env.PORT}/api`;

export function getArticleLatest(limit = 20) {
  return {
    type: 'GET_ARTICLE_LATEST',
    promise: fetch(`${apiURL}/articles?_limit=${limit}`)
  }
}

export function getSearchResults(keyword, limit = 20) {
  return {
    type: 'GET_SEARCH_RESULTS',
    promise: fetch(`${apiURL}/articles?q=${keyword}&_limit=${limit}`)
  }
}

export function getArticleById(id) {
  return {
    type: 'GET_ARTICLE_BY_ID',
    promise: fetch(`${apiURL}/articles/${id}`)
  }
}

export function getArticleContentById(id) {
  return {
    ...getArticleById(id),

    onPromiseResolve: result => {
      return getRelatedArticles(result.tags[0], id);
    }
  }
}

export function getRelatedArticles(keyword) {
  return {
    ...getSearchResults(keyword),
    type: 'GET_ARTICLE_RELATED'
  }
}