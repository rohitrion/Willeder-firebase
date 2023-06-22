
import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from 'mdb-react-ui-kit';

function Cards() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const api = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.instantwebtools.net/v1/passenger?page=${page}&size=20`
      );
      if (response.ok) {
        const jsonData = await response.json();
        setData((prevData) => [...prevData, ...jsonData.data]);
      } else {
        console.error('Error retrieving data from the API.');
      }
    } catch (error) {
      console.error('Error occurred during API fetch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    api();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = ''; // Provide the path to the fallback logo image
  };

  return (
    <div className='card-container'>
      {data.map((item,index) => (
        <div className='card'  key={`${item._id}-${index}`}>
          <MDBCard>
            <MDBCardImage
              position='top'
              src={item?.airline[0]?.logo}
              alt='Airline Logo'
              onError={handleImageError}
            />
            <MDBCardBody>
              <MDBCardTitle>
                <b>{item.name}</b>
              </MDBCardTitle>
              <MDBCardText>
                <div>
                  <b>Trips: {item.trips}</b>
                  <p>Airline: {item.airline[0]?.name}</p>
                  <p>Country: {item.airline[0]?.country}</p>
                  <p>Established: {item.airline[0]?.established}</p>
                </div>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </div>
      ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default Cards;

