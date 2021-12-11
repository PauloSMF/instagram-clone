import React from "react";
import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";

export default function Sidebar() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { user: { fullName, username, userId } } = useUser() as any;

    return (
        <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions />
        </div>
    );
}