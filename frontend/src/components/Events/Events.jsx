import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from '../../styles/styles';
import EventCard from "./EventCard";

const Events = () => {
  const [data, setData] = useState([]);
  const allEvents = useSelector((state) => state.events.events);
  const isLoading = useSelector((state) => state.products.isLoading);

// console.log(allEvents);
  useEffect(() => {
    // Sort or filter events based on your requirement
    // For example, sorting events by 'sold_out' property
    const sortedEvents = allEvents && allEvents.slice().sort((a, b) => a.sold_out - b.sold_out);
    setData(sortedEvents);
  }, [allEvents, isLoading]);

  return (
    <div>
       {
      !isLoading && (
        <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>

        <div className="w-full grid">
        <EventCard data={allEvents && allEvents[0]} />
        </div>
      </div>
      )
    }
    </div>
  );
};

export default Events;
