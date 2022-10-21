import { Card, Row, Col } from 'antd';  //, Table
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard"

const tabList = [
  {
    key: 'collect',
    tab: '收藏品',
  },
  {
    key: 'create',
    tab: '已发布',
  },
];


// const tableCol = [
//   {
//     title: '名称',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: '外部链接',
//     dataIndex: 'externalLink',
//     key: 'externalLink',
//   },
//   {
//     title: '简介',
//     dataIndex: 'description',
//     key: 'description',
//   },
// ];




const Cards = (props) => {
  
  const [activeTabKey, setActiveTabKey] = useState('collect');
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    if(activeTabKey === "collect") {
      setContentList(props.collect);
    } else {
      setContentList(props.create)

    } 
  }, [activeTabKey, props.collect, props.create])

  const onTabChange = (key) => {
    setActiveTabKey(key);
  }


  return (
      <Card
        style={{
          width: '100%',
        }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={(key) => {
          onTabChange(key);
        }}
      >
        {/* <Table dataSource={contentList} columns={tableCol} />; */}
        <Row gutter={[0, 24]}>
          {contentList.map((item, index) => (
              <Col key={index} span={4}>
              <Link to="/order" state={{data:item}}>
                  <ItemCard title = {item.name}
                            description = {item.description}
                            url = {item.url }
                  />
              </Link>
          </Col>))}
        </Row>
      </Card>
  )
}

export default Cards;