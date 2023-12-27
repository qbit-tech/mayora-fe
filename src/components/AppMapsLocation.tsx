import React, { useState } from 'react';
import {
  GoogleMap,
  MarkerF,
  Autocomplete,
  useJsApiLoader,
} from '@react-google-maps/api';

type Props = {
  isMain?: boolean;
  width?: number | string;
  height?: number;
  defaultZoom?: number;
  center?: { lat: number; lng: number };
  onChange: (location: {
    coords: { lat: number; lng: number };
    address: string;
    province: { long_name: string; short_name: string; types: string[] };
    city: { long_name: string; short_name: string; types: string[] };
    district: { long_name: string; short_name: string; types: string[] };

    state: { long_name: string; short_name: string; types: string[] };
    postalCode: { long_name: string; short_name: string; types: string[] };
  }) => void;
  geolocation?: {
    lat: number;
    lng: number;
  };
  type?: 'Add' | 'Edit';
  isDetail?: boolean;
};

function MapPickLocation(props: Props) {
  const [map, setMap] = React.useState(null);
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: -6.2,
    lng: 106.816666,
  });
  function onLoad(data: any) {
    // console.log("autocomplete: ", data);
    setAutocomplete(data);
  }

  function onPlaceChanged() {
    if (autocomplete !== null) {
      const locationInfo = autocomplete.getPlace();
      console.log(locationInfo);
      setCenter({
        lat: locationInfo.geometry.location.lat(),
        lng: locationInfo.geometry.location.lng(),
      });
      props.onChange({
        coords: {
          lat: locationInfo.geometry.location.lat(),
          lng: locationInfo.geometry.location.lng(),
        },
        address: locationInfo.formatted_address,
        postalCode: locationInfo.address_components.find((item: any) =>
          item.types.includes('postal_code')
        )!,
        state: locationInfo.address_components.find((item: any) =>
          item.types.includes('country')
        )!,
        province: locationInfo.address_components.find((item: any) =>
          item.types.includes('administrative_area_level_1')
        )!,
        city: locationInfo.address_components.find((item: any) =>
          item.types.includes('administrative_area_level_2')
        )!,
        district: locationInfo.address_components.find((item: any) =>
          item.types.includes('administrative_area_level_3')
        )!,
      });
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  }

  React.useEffect(() => {
    if (props.geolocation) {
      setCenter({
        lat: Number(props.geolocation.lat),
        lng: Number(props.geolocation.lng),
      });
    }
  }, [props.geolocation]);
  console.log(props.geolocation);
  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const onMapClick = (evt: any) => {
    setCenter({
      lat: evt.latLng.lat(),
      lng: evt.latLng.lng(),
    });
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: evt.latLng }, (results, status) => {
      if (status === 'OK') {
        console.log(results);
        props.onChange({
          coords: {
            lat: evt.latLng.lat(),
            lng: evt.latLng.lng(),
          },
          address: results?.[0].formatted_address!,
          postalCode: results?.[0].address_components.find((item) =>
            item.types.includes('postal_code')
          )!,
          state: results?.[0].address_components.find((item: any) =>
            item.types.includes('country')
          )!,
          province: results?.[0].address_components.find((item: any) =>
            item.types.includes('administrative_area_level_1')
          )!,
          city: results?.[0].address_components.find((item: any) =>
            item.types.includes('administrative_area_level_2')
          )!,
          district: results?.[0].address_components.find((item: any) =>
            item.types.includes('administrative_area_level_3')
          )!,
        });
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.REACT_APP_MAP_API_KEY}`,
    libraries: ['places'],
  });

  return isLoaded ? (
    <GoogleMap
      center={props.center ? props.center : center}
      mapContainerStyle={{
        height: 300,
        width: '100%',
      }}
      zoom={16}
      onClick={onMapClick}
      onUnmount={onUnmount}
    >
      {props.isDetail ? null : (
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <>
            <input
              type="text"
              placeholder="Input location store..."
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `250px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: 'absolute',
                left: '50%',
                marginLeft: '-120px',
              }}
            />
          </>
        </Autocomplete>
      )}

      <MarkerF
        key={'marker'}
        position={props.center ? props.center : center}
        onLoad={onLoad}
        icon={'/images/icon-marker-maps.svg'}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapPickLocation;
