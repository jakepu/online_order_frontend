import React, {useEffect, useState} from 'react';
import { Select, List, message, Card, Tooltip, Button} from 'antd';
import {addItemToCart, getMenus, getRestaurants} from "../utils";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const AddToCartButton = ({itemId}) => {
    const [loading, setLoading] = useState(false);
    const addToCart = () => {
        setLoading(true);
        addItemToCart(itemId)
            .then(() => message.success(`Successfully add item`))
            .catch((err) => message.error(err.message))
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <Tooltip title={"Add to shopping cart"}>
            <Button
                icon={<PlusOutlined/>}
                type="primary"
                loading={loading}
                onClick={addToCart}
            />
        </Tooltip>
    )
}
function FoodList(props) {
    const [curRest, setCurRest] = useState();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [foodData, setFoodData] = useState([]);
    useEffect(
        () => {
            setLoading(true);
            getRestaurants()
                .then( resData => {
                console.log("res data ->", resData);
                setRestaurants(resData);
            })
                .catch( err => {
                    console.log("err ->", err.message);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    , [])

    useEffect( () => {
        if (curRest) {
            setLoading(true);
            getMenus(curRest)
                .then((data) => {
                    setFoodData(data);
                })
                .catch((err) => {
                    message.error(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [curRest])
    return (
        <div>
            <Select value = {curRest}
                    style={{ width: 300 }}
                    onSelect={value => setCurRest(value)}
                    placeholder= "Select a restaurant"
                    loading = {loading}
            >
                {
                    restaurants.map(item => {
                        return <Option key={item.id}
                                       value={item.id}>
                            {item.name}
                        </Option>
                    })
                }
            </Select>
            {
                curRest &&
                    <List
                        dataSource={foodData}
                        style={{ marginTop: 20 }}
                        loading={loading}
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 3,
                            xxl: 3,
                        }}
                        renderItem = {item => (
                            <List.Item>
                                <Card
                                    title={item.name}
                                    extra={<AddToCartButton itemId={item.id} />}
                                >
                                    <img src={item.imageUrl}
                                         alt={item.name}
                                         style={{ height: "auto", width: "100%", display: "block" }}
                                    />
                                    Price: {item.price}
                                </Card>
                            </List.Item>
                            )
                        }
                    />
            }
        </div>

    );
}

export default FoodList;