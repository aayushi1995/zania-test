import { useState, useCallback, useEffect, useRef } from 'react';
import { DataType, InitialDataState } from '../types/Data'; // Ensure this import matches your types
import { getChangedPositions } from '../utils';

const useData = () => {
    const [data, setData] = useState<DataType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const dataRef = useRef<DataType[] | null>(null);
    const initialDataStateRef = useRef<InitialDataState | null>(null);

    useEffect(() => {
        dataRef.current = data;
        if(data && data.length > 0 && initialDataStateRef.current === null){
            initialDataStateRef.current = {
                data: data || [],
                time: new Date().getTime()
            }
        }
    }, [data]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/getdata')
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const result = await response?.json();
            setData(result.data);
            setLoading(false)
      

        } catch (error) {
            setError(`Failed to fetch data: ${error}`);
            console.error('Failed to fetch data:', error);
            setLoading(false)
            
        } finally {
            setLoading(false);
        }
    }, []);

    const updatePositions = useCallback(async () => {

        setLoading(true);
        setError(null);

        if (!dataRef.current || !initialDataStateRef.current) {
            setLoading(false);
            return;
        };

        
        const movedElements = getChangedPositions(dataRef.current, initialDataStateRef.current.data);
        if(!movedElements || movedElements?.length === 0) {
            setLoading(false);
            return;
        }       

        try {
            const request = new Request('/updatepositions', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                /* Sending entire data because wrong calculation was causing a bug*/
                body: JSON.stringify(dataRef.current),
            });

            const response = await fetch(request);
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
                
            }
            console.log('Update successful:', response.status);

            initialDataStateRef.current = {
                data: dataRef.current,
                time: new Date().getTime()
            }
            setLoading(false)
            setError(null)
        
        } catch (error) {
            setLoading(false)
            setError(`Failed to update data: ${error}`);
            console.error('Failed to update data:', error);
          
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();        
        const interval = setInterval(() => {
            updatePositions();
        }, 5000);
        return () => {
            clearInterval(interval);
            updatePositions();
        }
    }, []);

    return { data, loading, error, updateData: setData, lastSave: initialDataStateRef.current?.time }; // Expose a function to update data
};

export default useData;
