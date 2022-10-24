import { Button, Form, Input } from 'antd';
import request from '../../request'
import {mint} from "../../web3utils/connect";

const Forms = () => {
  const onFinish = (values) => {
    const key = 'your key';
    const secret = 'your secret';
    var fileData = localStorage.getItem("fileData")
    var user = localStorage.getItem("user")
    values.url = "https://gateway.pinata.cloud/ipfs/" + fileData
    values.creater = user
    request.post('https://api.pinata.cloud/pinning/pinJSONToIPFS',
                  values,
                  {headers: { pinata_api_key: key,
                              pinata_secret_api_key: secret
                            }
                  }
                ).then(res => {
    let tokenURI = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash
    mint(tokenURI)
    })
    
    localStorage.removeItem("fileData")
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="create"
      layout="vertical"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
      style={{fontWeight:'bolder'}}
    >
      <Form.Item
        label="名称"
        name="name"
        rules={[
          {
            required: true,
            message: '请输入产品名称!',
          },
        ]}
      >
        {/* <p className="hint">
          
        </p> */}
        <Input placeholder="输入产品的名称，必填"/>
      </Form.Item>

      <Form.Item
        label="外部链接"
        name="externalLink"
      >
        {/* <p className="hint">
          
        </p> */}
        <Input placeholder="可提供自己的网页链接，详细介绍自己的产品"/>
      </Form.Item>

      <Form.Item
        label="简介"
        name="description"
      >
        {/* <p className="hint">
          
        </p> */}
        <Input size='large' placeholder="介绍自己的产品"/>
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Forms;
