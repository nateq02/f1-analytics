import { useState, useEffect } from "react";
import axios from "axios";

// This is a custom hook meant to fetch data from the backend
const useFetchData = (url, path) => {
    // uses useState for several reasons
        // As data changes, we are able to rerender our components with new data
        // Makes this function more reusable?

    // used to load, store, and set the actual data from the backend
    const [data, setData] = useState(null);
    
    // used as an indicator of whether or not the data is loading
        // used as a check on the frontend
    const [isLoading, setIsLoading] = useState(true);

    // useEffect is supposed to have some benefits header  
        // It's best practice
        // It allows the webpage to load if the process of getting data takes longer
    useEffect(() => {
        // Function to actually fetch the data
        const fetchData = async () => {
            // Try catch to catch errors
            try {
                setIsLoading(true);
                // Actually get the data
                const response = await axios.get(url+path);
                // Only need the data part of the response/promise
                const responseData = await response.data
                // Convert the data into JSON from a string
                const jsonData = JSON.parse(responseData);
                // Set state of data to the JSON data
                setData(jsonData);
            }
            // Catch any erros and log them --> probably a better way to handle this
            catch (error) {
                console.log(error);
            }
            // When everything is done, set isLoading to indicate the data has been set
            finally {
                setIsLoading(false);
            }
        }
    // Call the fetch data
    fetchData();
    }, [url, path]);
    // Return a collection of data and isLoading
    return { data, isLoading };
};

export { useFetchData };