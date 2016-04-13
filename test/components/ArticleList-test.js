import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ArticleList from '../../src/components/ArticleList';
import Article from '../../src/components/Article';

describe('<ArticleList />', () => {
	
  let articles = [];
  let wrapper = {};

  beforeEach(() => {
    
    articles = [
      {
        id: '1',
        title: 'Title 1'    
      }, {
        id: '2',
        title: 'Title 2'    
      }
    ];
    
    wrapper = shallow(<ArticleList articles={articles} />)
  });

  it('should render the correct count of data', () => {
    expect(wrapper.find(Article)).to.have.length(2);	
	});

  it('should render the correct data', () => {
    expect(wrapper.find(Article).at(1).props().article.id).to.eql(articles[1].id); 
  });
});