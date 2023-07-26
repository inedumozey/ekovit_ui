import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Skeleton from '../components/utils/Skeleton';

const center = {
    lat: 18.8566,
    lng: 2.2945
}

export default function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    })

    if (!isLoaded) {
        return (
            <div className='min-h-[100vh] '>
                <Skeleton type='comment' />
            </div>
        )
    }

    else {

        return (
            <div className='min-h-[100vh]'>
                <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>

                </GoogleMap>
            </div>
        )
    }
}
