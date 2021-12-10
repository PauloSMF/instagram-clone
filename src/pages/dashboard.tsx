import React, { useEffect } from "react";
//Components
import Timeline from "../components/timeline";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function Dashboard() {
    useEffect(() => {
        document.title = 'Instagram';
    }, []);

    return (
        <div className="bg-gray-background">
            <div className="grid">
                <Header />
                <Timeline />
                <Sidebar />
            </div>
        </div>
    );
}