import { useState, useCallback, useEffect, useRef } from 'react';
import { Data } from '../types/Data'; // Ensure this import matches your types
import { getChangedPositions } from '../utils';

const useData = () => {
    const [data, setData] = useState<Data[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const dataRef = useRef<Data[] | null>(null);
    const initialDataStateRef = useRef<Data[] | null>(null);

    useEffect(() => {
        initialDataStateRef.current = dataRef.current
        dataRef.current = data;
    }, [data]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/getdata');
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const result = await response.json();
            setData(result.data);
            console.log('Fetched successful:', result.data, response.status);
        } catch (error) {
            setError(`Failed to fetch data: ${error}`);
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const updatePositions = useCallback(async () => {
        if (!dataRef.current) return;
        const movedElements = getChangedPositions(dataRef?.current);
        if (!movedElements) return;
        try {
            const request = new Request('/updatepositions', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movedElements),
            });

            const response = await fetch(request);
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            console.log('Update successful:', response.status);
        } catch (error) {
            setError(`Failed to update data: ${error}`);
            console.error('Failed to update data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            updatePositions();
        }, 5000);
        return () => clearInterval(interval);
    }, [fetchData, updatePositions]);

    return { data, loading, error, updateData: setData }; // Expose a function to update data
};

export default useData;
