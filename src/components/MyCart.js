import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
function MyCart(props) {
    const [cartVisible, setCartVisible] = useState(false);

    const onOpenDrawer = () => {
        setCartVisible(true);
    };

    const onCloseDrawer = () => {
        setCartVisible(false);
    };
    return (
        <>
            <Button type="primary"
                    onClick={onOpenDrawer}
                    shape="round"
            >
                Cart
            </Button>
            <Drawer title="Basic Drawer" placement="right" onClose={onCloseDrawer} visible={cartVisible}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>

    );
}

export default MyCart;