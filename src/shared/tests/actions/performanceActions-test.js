import { expect } from 'chai';

import { ARTICLE_DELETE_BY_ID } from '../../constants/actionTypes';
import * as performanceActions from '../../redux/actions/performanceActions';

describe('Performance actions', () => {

  describe('Delete Article', () => {
    let action;
    let id = 1;

    beforeEach(() => {
      action = performanceActions.deleteArticle(id);
    });

    it('should have the correct type', () => {
      expect(action.type).to.equal(ARTICLE_DELETE_BY_ID);
    });

    it('should have the correct payload', () => {
      expect(action.id).to.equal(id);
    });
  });
  
});