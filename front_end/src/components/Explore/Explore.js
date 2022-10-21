import { Col, Row, Pagination } from "antd";
import { Component } from "react";
import { Link } from "react-router-dom";

import ExploreCard from "./ExploreCard"
import {listItem} from "../../web3utils/connect";

class Explore extends Component {

    i = 0

    constructor(props) {
        super(props);
        this.state = {data: []}
        this.onChange = this.onChange.bind(this)
    };

    componentDidMount() {
        this.getData()
        
    };

    render() {
        return(
            <div>
                <header>
                    <h1>探索收藏品</h1>
                </header>
                <Row gutter={[0, 48]}>
                    {this.state.data.map((item, index) => (
                        <Col key={index} span={8}>
                        <Link to="/order" state={{data:item}}>
                            <ExploreCard title = {item.name}
                                        description = {item.description}
                                        url = {item.url }
                            />
                        </Link>
                    </Col>
                    ))}
                    {/* <Col span={8}>
                        <Link to="/order" state={{name:this.state.data[0 + this.i].name, picture:this.state.data[0 + this.i].url}}>
                            <ExploreCard title = {this.state.data[0 + this.i].name}
                                        description = {this.state.data[0 + this.i].description}
                                        url = {this.state.data[0 + this.i].url }
                            />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/order" state={{name:this.state.data[1 + this.i].name, picture:this.state.data[1 + this.i].url}}>
                            <ExploreCard title = {this.state.data[1 + this.i].name}
                                        description = {this.state.data[1 + this.i].description}
                                        url = {this.state.data[1 + this.i].url }
                            />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/order" state={{name:this.state.data[2 + this.i].name, picture:this.state.data[2 + this.i].url}}>
                            <ExploreCard title = {this.state.data[2 + this.i].name}
                                        description = {this.state.data[2 + this.i].description }
                                        url = {this.state.data[2 + this.i].url }
                            />
                        </Link>
                    </Col>
                
                    <Col span={8}>
                        <Link to="/order" state={{name:this.state.data[3 + this.i].name, picture:this.state.data[3 + this.i].url}}>
                            <ExploreCard title = {this.state.data[3 + this.i].name}
                                        description = {this.state.data[3 + this.i].description}
                                        url = {this.state.data[3 + this.i].url }
                            />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/order" state={{name:this.state.data[4 + this.i].name, picture:this.state.data[4 + this.i].url}}>
                            <ExploreCard title = {this.state.data[4 + this.i].name}
                                        description = {this.state.data[4 + this.i].description}
                                        url = {this.state.data[4 + this.i].url }
                            />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/order" state={{name:this.state.data[5 + this.i].name, picture:this.state.data[5 + this.i].url}}>
                            <ExploreCard title = {this.state.data[5 + this.i].name}
                                        description = {this.state.data[5 + this.i].description }
                                        url = {this.state.data[5 + this.i].url }
                            />
                        </Link>
                    </Col> */}
                </Row>

                <Pagination defaultCurrent={1} onChange={this.onChange} total={this.state.data.length} />
            </div>
        )
    };

    async getData() {
        this.setState({data: await listItem()})
    };

    onChange(page) {
        this.i = 0 + (page - 1) * 6
        this.forceUpdate()
    }
}

export default Explore