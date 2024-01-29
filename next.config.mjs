/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.pinimg.com', 'cdn.bio.link' , 'firebasestorage.googleapis.com'],
    },
    env: {
        PATH_URL_BACKEND: 'http://localhost:8080/api',
        API_KEY: 'AIzaSyCieLYqRPt8Z4hasGA5U_-Fu4zYNHbSbFI',
        AUTH_DOMAIN: 'nevself.firebaseapp.com',
        PROJECT_ID: 'nevself',
        STORAGE_BUCKET: 'nevself.appspot.com',
        MESSAGING_SENDER_ID: '1041214049233',
        APP_ID: '1:1041214049233:web:4bfe3e86c38698952e6ef0',
        MEASUREMENT_ID: 'G-SK01TRRP1T',
    },
};

export default nextConfig;
