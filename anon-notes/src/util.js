import useSWR from 'swr';
import axios from 'axios'
import { useState } from 'react';

const fetcher = url => axios.get(url, {
    headers: {
        'X-Email': window.localStorage.getItem("email"),
        'X-Password': window.localStorage.getItem("password")
    }
}).then(res => res.data);


export {fetcher};



