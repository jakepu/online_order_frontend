import React, { useState, useEffect } from 'react';
import { Drawer, Button, Typography, message, List } from 'antd';
import {getCart, checkout} from "../utils";

const {Text} = Typography;


function MyCart(props) {
    const [cartVisible, setCartVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cartData, setCartData] = useState({totalPrice: 0, orderItemList:[]});
    const [checking, setChecking] = useState(false);
    const onOpenDrawer = () => {
        setCartVisible(true);
    };

    const onCloseDrawer = () => {
        setCartVisible(false);
    };
    const onCheckOut = () => {
        setChecking(true);
        checkout()
            .then(() => {
                message.success("Successfully checkout");
                setCartVisible(false);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setChecking(false);
            });
    };
    useEffect(() => {
        if (!cartVisible) return;
        setLoading(true);
        getCart()
            .then(cartData => {
                setCartData(cartData);
            })
            .catch(err => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    },[cartVisible]);
    return (
        <>
            <Button type="primary"
                    onClick={onOpenDrawer}
                    shape="round"
            >
                Cart
            </Button>
            <Drawer title="My shopping Cart"
                    placement="right"
                    onClose={onCloseDrawer}
                    visible={cartVisible}
                    footer={
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                         <Text>{`Total price: ${cartData ? cartData.totalPrice.toFixed(2) : 0}`}</Text>
                            <div>
                                <Button>Cancel</Button>
                                <Button
                                    onClick={onCheckOut}
                                    type="primary"
                                    loading={checking}
                                    disabled={loading || cartData?.orderItemList.length === 0}
                                >
                                    Checkout
                                </Button>

                            </div>
                        </div>
                    }
            >
                <List
                    dataSource={cartData.orderItemList}
                    loading={loading}
                    renderItem={
                        item => {
                            return (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.menuItem.name}
                                        description={`$${item.price}`}
                                    />
                                </List.Item>
                            )
                        }
                    }
                />

            </Drawer>
        </>

    );
}

export default MyCart;