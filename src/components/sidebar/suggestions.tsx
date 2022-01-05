import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './suggested-profile'

export default function Suggestions({ userId, following }: { userId: string, following: string[] }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [profiles, setProfiles] = useState<any[]>([]);

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }

        if(userId){
            suggestedProfiles();
        }
    }, [userId]);

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items
            justify-between mb-2">
                <p className="font-bold text-gray-base">
                    Sugestões para você
                </p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile) => (
                    <SuggestedProfile
                        key={profile.docId}
                        userDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                    />
                ))}
            </div>
        </div>
    ) : null;
}