import { useState, useEffect } from "react";
import axios from "axios";

// This is a custom hook meant to fetch data from the backend
const useFetchData = (path) => {
    // uses useState for several reasons
        // As data changes, we are able to rerender our components with new data
        // Makes this function more reusable?

    // used to load, store, and set the actual data from the backend
    const [data, setData] = useState(null);
    
    // used as an indicator of whether or not the data is loading
        // used as a check on the frontend
    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState(null);

    const url = 'http://127.0.0.1:8000'
    // useEffect is supposed to have some benefits header  
        // It's best practice
        // It allows the webpage to load if the process of getting data takes longer
    useEffect(() => {
        // Function to actually fetch the data
        const fetchData = async () => {
            // Try-catch to catch errors
            try {
                setIsLoading(true);
                // Actually get the data
                const response = await axios.get(url+path);
                // Only need the data part of the response/promise
                const responseData = await response.data
                // Set state of data to the responseData
                setData(responseData);
            }
            // Catch any errors and log them --> probably a better way to handle this
            catch (e) {
                setError(e);
            }
            // When everything is done, set isLoading to indicate the data has been set
            finally {
                setIsLoading(false);
            }
        }
    // Call the fetch data
    fetchData();
    }, []);
    // Return a collection of data and isLoading
    return { data, isLoading, error };
};

export { useFetchData };