import NexusNav from './components/layout/common/navbar/NexusNav'
import { useState, useEffect } from 'react'
import MapBox from './components/map/MapBox'
import styles from './style/Home.module.css'
import Footer from './components/layout/common/footer/Footer'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const { req_info } = useSelector((state) => state.request_data)
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  })
  const { latitude, longitude } = coordinates
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        function error(err) {
          alert('Please allow location access', err)
          window.location.reload()
        }
      )
    }
  }, [])

  return (
    <div className={styles.container}>
      <NexusNav />
      <div className={styles.mapbox}>
        <MapBox
          latitude={latitude}
          longitude={longitude}
          data={req_info?.coordinates}
          person={req_info?.user}
        />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
