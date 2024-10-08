import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import OrderCheck from "@/components/orderChecker";

const OrderCheckPage = () => {
    const router = useRouter();
    const [account, setAccount] = useState('');

    useEffect(() => {
        if (router.query.account) {
            setAccount(router.query.account);
        }
    }, [router.query]);

    return (
        <div className="p-1 mb-4 overflow-hidden">
            <OrderCheck key={account} account={account} /> 
        </div>
    );
};

export default OrderCheckPage;
