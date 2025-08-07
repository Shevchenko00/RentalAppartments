import { useState } from 'react';

export const useLoading = (initial = true) => {
    const [loading, setLoading] = useState(initial);
    return { loading, setLoading };
};