import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import logo from '../../static/logo.png';
import { Link } from '../../routes';
import SearchInput from '../shared/SearchInput';

import Videos from './Videos';

const videosFragment = gql`
  fragment Video on Video {
    _id
    title
    models
    img_url
    code
    total_view_count
    tags
    publishedAt
    length
    score
    videos {
      source
      url
      view_count
    }
  }
`;

const hotVideosQuery = gql`
  query {
    hotVideos {
      ...Video
    }
  }
  ${videosFragment}
`;

const newVideosQuery = gql`
  query {
    newVideos {
      ...Video
    }
  }
  ${videosFragment}
`;

const SearchSection = styled.section`
  height: 70vh;
  width: 100%;
`;

const VideosSection = styled.section`
  margin: 80px;
`;

const Logo = styled.img`
  height: 80px;
  padding: 20px 20px 20px 0;
  cursor: pointer;
`;

class Home extends Component {
  render() {
    const {
      hotVideosQuery: { hotVideos },
      newVideosQuery: { newVideos },
    } = this.props;

    return (
      <Fragment>
        <SearchSection key="searchSection">
          <Row
            type="flex"
            justify="start"
            align="middle"
            style={{ margin: '0 50px' }}
          >
            <Col>
              <Link route="/?logo=1">
                <Logo src={logo} alt="Logo" />
              </Link>
            </Col>
          </Row>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ height: '100%' }}
          >
            <Col span={12}>
              <SearchInput />
            </Col>
          </Row>
        </SearchSection>
        <VideosSection key="hot">
          {hotVideos ? <Videos title="熱門影片" data={hotVideos} /> : null}
        </VideosSection>
        <VideosSection key="latest">
          {newVideos ? <Videos title="最新影片" data={newVideos} /> : null}
        </VideosSection>
      </Fragment>
    );
  }
}

Home.propTypes = {
  hotVideosQuery: PropTypes.object,
  newVideosQuery: PropTypes.object,
};

Home.defaultProps = {
  newVideosQuery: {},
  hotVideosQuery: {},
};

export default compose(
  graphql(newVideosQuery, { name: 'newVideosQuery' }),
  graphql(hotVideosQuery, { name: 'hotVideosQuery' })
)(Home);
