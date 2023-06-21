import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
} from 'mdb-react-ui-kit';

import { useState, useEffect } from 'react';

function Cards() {

    const [data, setdata] = useState([]);
    const [page, setpage] = useState(1);

    const api = async () => {
        const info = await fetch(
            `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
        );

        const data = await info.json();

        setdata((prev) => [...prev, ...data.data]);
    };
    console.log(data)
    console.log("euiriurh", data.data)

    const handlescroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            setpage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        api();
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", handlescroll);

        return () => window.removeEventListener("scroll", handlescroll);
    }, []);


    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = ''; // Provide the path to the fallback logo image
    };
    return (
        <>
            <div className='card-container'>
                {
                    data && data.map((item, index) => (
                        <div className='card' key={`${item._id}-${index}`}>
                            <MDBCard>
                                <MDBCardImage position='top' src={item.airline[0]?.logo}
                                    alt='Airline Logo'
                                    onError={handleImageError} />
                                <MDBCardBody>
                                    <MDBCardTitle><b>{item.name}</b></MDBCardTitle>
                                    <MDBCardText>
                                        <div>
                                            <b>trips:{item.trips} {''} Id:{index} </b>
                                            <p>Airline: {item.airline[0]?.name}</p>
                                            <p>Country: {item.airline[0]?.country}</p>
                                            <p>Established: {item.airline[0]?.established}</p>
                                        </div>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    ))
                }
            </div>
        </>

    );
}

export default Cards

