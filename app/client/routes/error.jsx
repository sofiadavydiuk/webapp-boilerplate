import React from 'react';

export default function ErrorPage({error}) {
    return(
        <div className="ErrorPage">
            <h1>{error}</h1>
            <pre>{JSON.stringify(error, null, 4)}</pre>
        </div>
    );
}
