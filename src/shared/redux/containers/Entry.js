import { connect } from 'react-redux';
import * as articleActions from 'shared/redux/actions/articleActions';

import Entry from 'shared/components/pages/Entry';

function mapStateToProps(state) {
  return {
    articleActive: state.articleActive
  };
}

Entry.prefetchData = [
  function(params) {
    return articleActions.getArticleContentById(params.id);
  }
];

module.exports = connect(mapStateToProps, articleActions)(Entry);