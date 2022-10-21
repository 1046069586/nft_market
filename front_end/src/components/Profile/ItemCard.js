import { Card } from 'antd';
const { Meta } = Card;

const ItemCard = (props) => {
  return (
  <Card
    style={{
      width: 180
    }}
    cover={
    <img alt="card" src={props.url} height='180'/>
    }
  >
    <Meta title= {props.title} description={props.description} />
  </Card>)
};

export default ItemCard;