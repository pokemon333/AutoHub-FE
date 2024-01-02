const haversineDistance = (lat1, lon1, lat2, lon2) =>  {

    const EARTHRADIUS = 6371

    const toRadians = (degrees) =>  degrees * (Math.PI / 180) 

    lat1 = toRadians(lat1)
    lon1 = toRadians(lon1)
    lat2 = toRadians(lat2)
    lon2 = toRadians(lon2)

    const distance = Math.acos( Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * EARTHRADIUS;

    return distance
}


export {
    haversineDistance
}