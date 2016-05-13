import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Perf from 'react-addons-perf';

import * as articleActions from 'shared/redux/actions/articleActions';
import * as performanceActions from 'shared/redux/actions/performanceActions';

import Article from './Article';

class PerformancePage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      idle: true
    };

    this.startPerf = this.startPerf.bind(this);
    this.stopPerf = this.stopPerf.bind(this);
    this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
  }

  componentDidMount() {
    this.props.getArticleLatest(500);
  }

  startPerf() {
    this.setState({
      idle: false
    });
    Perf.start();
  }

  stopPerf() {
    this.setState({
      idle: true
    });
    Perf.stop();
    Perf.printOperations();
    Perf.printWasted();
  }

  handleDeleteArticle(id) {
    this.props.deleteArticle(id);
  }

  render() {
    
    return (
      <div>
        <Helmet title="Performance Tool" />
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              { this.state.idle ? <button onClick={this.startPerf}>Start Recording</button> : <button onClick={this.stopPerf}>Stop and View Results</button> }              
            </div>
          </div>
          <div className="row">
            { this.props.articles.map((article, index) => {
              return <Article key={ article.id } article={article} handleDeleteArticle={ this.handleDeleteArticle } />;
            }) }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articleLatest
  };
}

module.exports = connect(mapStateToProps, {...articleActions, ...performanceActions})(PerformancePage);