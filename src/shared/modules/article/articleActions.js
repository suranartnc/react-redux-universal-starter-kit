import jwt from 'jsonwebtoken';
import reactCookie from 'react-cookie';
import { AUTH_TOKEN } from 'shared/system/constants';

import * as actionTypes from 'shared/modules/article/actionTypes';

export function getArticleLatest(limit = 20) {
  return {
    type: actionTypes.ARTICLE_GET_LATEST,
    request: {
      path: `/articles?_sort=id&_order=DESC&_limit=${limit}`
    }
  };
}

export function getSearchResults(keyword, limit = 20) {
  return {
    type: actionTypes.ARTICLE_GET_SEARCH_RESULTS,
    request: {
      path: `/articles?q=${keyword}&_sort=id&_order=DESC&_limit=${limit}`
    }
  };
}

export function getArticleById(id) {
  return {
    type: actionTypes.ARTICLE_GET_BY_ID,
    request: {
      path: `/articles/${id}`
    }
  };
}

export function getArticleContentById(id) {
  return {
    ...getArticleById(id),

    callback: (response) => {
      return getRelatedArticles(response.tags[0]);
    }
  };
}

export function getRelatedArticles(keyword) {
  return {
    ...getSearchResults(keyword),
    type: actionTypes.ARTICLE_GET_RELATED_ARTICLES
  };
}

export function createNewArticle(data) {
  const token = reactCookie.load(AUTH_TOKEN);
  const user = jwt.decode(token);
  data = {
    ...data,
    memberId: user.sub,
    member: user
  };
  return {
    type: actionTypes.ARTICLE_CREATE,
    request: {
      path: '/articles',
      options: {
        method: 'POST',
        body: data
      }
    }
  };
}

export function editArticle(id) {
  return {
    ...getArticleById(id),
    type: actionTypes.ARTICLE_EDIT_BY_ID
  };
}

export function updateArticleById(id, data) {
  return {
    type: actionTypes.ARTICLE_UPDATE_BY_ID,
    request: {
      path: `/articles/${id}`,
      options: {
        method: 'PATCH',
        body: data
      }
    }
  };
}

export function deleteArticle(id) {
  return {
    type: actionTypes.ARTICLE_DELETE_BY_ID,
    id,
    request: {
      path: `/articles/${id}`,
      options: {
        method: 'DELETE'
      }
    }
  };
}

export function resetActiveArticle() {
  return {
    type: actionTypes.ARTICLE_ACTIVE_RESET
  };
}