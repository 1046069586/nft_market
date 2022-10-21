import { Component } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Cards from "./Cards"
import "./Profile.css"
import { myCreated, myCollected } from "../../web3utils/connect";

class Profile extends Component {
    

    constructor(props) {
        super(props);
        this.username = localStorage.getItem("user");
        this.state = {collectData : [], createData : []}
    };

    componentDidMount(){
        // request.get("/users/create/" + this.username).then(res => {
        //     for(var i=0; i<res.data.length; i++) {
        //         res.data[i].key = i+1
        //     }
        //     this.setState({createData : res.data})
        // });
        // request.get("/users/collect/" + this.username).then(res => {
        //     for(var i=0; i<res.data.length; i++) {
        //         res.data[i].key = i+1
        //     }
        //     this.setState({collectData : res.data})
        // });
        this.getData()

        
    }

    async getData(){
        this.setState({createData: await myCreated()})
        this.setState({collectData: await myCollected()})
    }
   

    render() {
        return (
            <div>
                <div className="avatar">
                    <Avatar size={128}  style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </div>
                <div className="username">
                    {this.username}
                </div>
                <div className="cards">
                    <Cards collect={this.state.collectData} create={this.state.createData}/>
                </div>
                
            </div>
        )
    }
}

export default Profile;