import React from "react";
import Client from "./client"

export default function Page(){
    return <div className="w-full h-full bg-blue-800">
        <Client/>
    </div>
};

export const runtime = 'edge';
