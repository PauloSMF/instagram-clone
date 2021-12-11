import React from "react";
import useUser from "../hooks/use-user";

export default function Sidebar() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { user: { fullName, username, userId } } = useUser() as any;

    return (
        <div className="p-4">
        </div>
    );
}