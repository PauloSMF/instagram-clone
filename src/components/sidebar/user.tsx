import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function User({ username, fullName }: { username: string, fullName: string }) {
    return !username || !fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={`/p/${username}`} className="grid grid-cols-4 mb-6
        items-center">
            <div className="flex items-center justify-between col-span-1">
                <img 
                    className="rounded-full w-16 flex mr-3"
                    src={'images/avatars/default.png'}
                    alt={`Foto de perfil de ${fullName}`}
                />
            </div>
            <div className="col-span-3">
                <p className="font-bold text-sm">{username}</p>
                <p className="text-sm">{fullName}</p>
            </div>
        </Link>
    );
}

