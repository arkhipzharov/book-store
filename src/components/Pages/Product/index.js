import { Tabs, Tab } from 'react-bootstrap';
import styled from 'styled-components';
import { Info } from './Info';
import { Reviews } from './Reviews';

export const Product = () => {
  return (
    <TabsWrapper>
      <Tabs defaultActiveKey="info">
        <Tab eventKey="info" title="Information">
          <Info />
        </Tab>
        <Tab eventKey="reviews" title="Reviews">
          <Reviews />
        </Tab>
      </Tabs>
    </TabsWrapper>
  );
};

const TabsWrapper = styled.div`
  .tab-pane {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-radius: 0 0 5px 5px;
    padding: 20px;
  }
`;
