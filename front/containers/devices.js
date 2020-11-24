import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { Row, Col } from 'antd';
import basicStyle from '@iso/assets/styles/constants';

const RandomizedDataLine = dynamic(() =>
  import(
    '@iso/containers/Charts/ReactChart2/Components/RandomizedLine/RandomizedLine'
  )
);
const PageHeader = dynamic(() => import('@iso/components/utility/pageHeader'));
const Box = dynamic(() => import('@iso/components/utility/box'));
const LayoutWrapper = dynamic(() =>
  import('@iso/components/utility/layoutWrapper')
);
const ContentHolder = dynamic(() =>
  import('@iso/components/utility/contentHolder')
);
export default function Devices() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  return (
    <LayoutWrapper className="isoMapPage">
      <PageHeader>Chart 준비중</PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} xs={24} style={colStyle}>
          <Box title="디바이스 차트">
            <ContentHolder>
              <RandomizedDataLine />
            </ContentHolder>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}
