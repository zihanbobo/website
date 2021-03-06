import { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const QUERY = gql`
  query video($code: String!) {
    video(code: $code) {
      _id
      title
      models
      img_url
      code
      total_view_count
      videos {
        source
        url
        view_count
      }
      score
      length
      tags
    }
  }
`;

class VideoQuery extends Component {
  render() {
    if (!this.props.data.loading) {
      return this.props.children(this.props.data);
    }

    return null;
  }
}

VideoQuery.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default graphql(QUERY, {
  options: ({ code }) => ({
    variables: { code },
  }),
})(VideoQuery);
