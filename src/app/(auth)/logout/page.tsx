'use client';

import axios from "axios";
import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter();
    const logout = async () => {
        try {
            const res = await axios.get('/api/auth/logout');
            //console.log(res);
            router.push('/login');
        } catch (err) {
            console.log("This is err",err)
        }
    } 
    logout();
    return <>
    </>
}

export default Logout;