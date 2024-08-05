"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const OAuthCallbackComponent = () => {
    const router = useRouter();

    useEffect(() => {
        const handleGoogleAuth = async () => {
            const code = new URLSearchParams(window.location.search).get('code');

            if (code) {
                const response = await fetch('/api/auth/google', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code }),
                });

                if (response.ok) {
                    // Redirect to the homepage or desired page after successful login
                    router.push('/EMPA');
                } else {
                    // Handle errors (e.g., show a message to the user)
                    console.error('Failed to authenticate with Google');
                    router.push("/login")
                }
            }
        };

        handleGoogleAuth();
    }, [router]);

    return <div>Loading...</div>;
};

export default OAuthCallbackComponent;
