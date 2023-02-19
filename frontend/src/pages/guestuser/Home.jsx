import React from 'react';
import { Link } from 'react-router-dom'
import Login from './login';
import RenderInto from '../../components/RenderInto';

export default function Home() {
    return (
        <>
        <h1 className="container display-3">
            Wise Water
        </h1>
        <div className=" container my-3 p-3 mb-2 bg-primary bg-gradient text-blue">
        <Login/>
        </div>
        </>
    )
}

