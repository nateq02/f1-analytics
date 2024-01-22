import { useState, useEffect, useMemo } from "react";
import axios from "axios"

// A helper function to find the most recent event given a schedule and today's date
function findLastEventIndex(schedule, currDate) {
    // Sets an initial counter to 0
    let counter = 0;

    // Keep incrementing the counter until the currentDate < an EventDate (which is upcoming)
    while (currDate > schedule[counter].EventDate) {
        counter++;
    }

    // Return the event before the upcoming, which is the most recent
    return counter - 1;
}

// Hook to fetch the most recent event
const useLastEvent = () => {
    // Sets states for data, isLoading, and any errors
    const [lastEvent, setLastEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Defines current date, current year, and a url link for later use
    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const url = 'http://127.0.0.1:8000'

    // allows us to fetch data asynchronously
    useEffect(() => {
        const fetchData = async () => {
            // try to catch errors
            try {
                setIsLoading(true);
                // Request to get the data
                const response = await axios.get(url+`/schedule/${currYear}`);
                // Only get the data part of the response
                const responseData = await response.data;
                // Convert the data to JSON
                const jsonData = JSON.parse(responseData);
                
                // Handles logic from between seasons
                    // if current date is not greater than the first event date, last event was last season
                if (currDate < jsonData[0].EventDate) {
                    const newResponse = await axios.get(url+`/schedule/${currYear - 1}`);
                    const newResponseData = await newResponse.data;
                    const newJsonData = JSON.parse(newResponseData);
                    setLastEvent(newJsonData[newJsonData.length - 1]);
                }
                // If the last event is this season, find and set it
                else {
                    setLastEvent(jsonData[findLastEventIndex(jsonData, currDate)])
                }
            }
            // Catch any errors
            catch (e) {
                setError(e);
            }
            // Once done, indicate that it is no longer loading
            finally {
                setIsLoading(false);
            }
        }
    
        fetchData();
    }, [])

    // return an object with all necessary data
    return { lastEvent, isLoading, error };
}

export { useLastEvent }