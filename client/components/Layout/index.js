import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Layout } from 'antd';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  width: 100% !important;
  margin: 0 !important;
  background-color: #fff !important;
  font-family: 'Hiragino Sans GB', 'Helvetica Neue', Helvetica,
    'STHeitiSC-Light', 'Microsoft YaHei', '微軟雅黑', Arial, sans-serif !important;

  * {
    font-family: inherit;
  }
  a {
    text-decoration: none !important;
  }
  input {
    outline: none !important;
  }
`;

const StyledContent = styled(Content)`
  margin-top: 80px;
`;

const CustomLayout = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/antd/3.0.0/antd.min.css"
      />
    </Head>

    <StyledLayout>
      <Header />
      <StyledContent>{children}</StyledContent>
      <Footer />
    </StyledLayout>
  </div>
);

CustomLayout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};

CustomLayout.defaultProps = {
  title: 'PPAV',
};

export default CustomLayout;