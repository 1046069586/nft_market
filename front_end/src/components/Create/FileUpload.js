import { FileAddOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const key = '7a333580d9d43ad228fc';
const secret = 'da0380b0a2894b36f73fa8f0c231df8f31319efcbdd9d3d2837666e37048bbfa';

const props = {
  name: 'file',
  multiple: true,
  action: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
  headers: { pinata_api_key: key,
             pinata_secret_api_key: secret },

  onChange(info) {
    // 在上传过程会多次调用，根据status值确定上传状态
    const { status } = info.file;

    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      console.log(info.file.response.IpfsHash)
      var fileData = info.file.response.IpfsHash;
      localStorage.setItem("fileData", fileData)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const FileUpload = () => (
  <Dragger {...props} height='250px'>
    <p className="ant-upload-drag-icon">
      <FileAddOutlined /> 
    </p>
    <p className="ant-upload-text">点击或拖拽上传文件</p>
    <p className="ant-upload-hint">
      文件格式支持JPG, PNG
    </p>
  </Dragger>
);

export default FileUpload;