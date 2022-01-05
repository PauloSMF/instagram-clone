import React, { useState } from "react"
import { Link } from "react-router-dom";

export default function SuggestedProfile({ userDocId, username, profileId, userId }: 
{ userDocId: string, username: string, profileId: string, userId: string}) {
    const [followed, setFollowed ] = useState(false);

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img 
                    className="rounded-full w-8 flex mr-3"
                    src={`/images/avatars/${username}.jpg`}
                    alt=""
                />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
        </div>
    ) : null;
}