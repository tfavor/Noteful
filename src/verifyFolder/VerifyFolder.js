import React, { Component } from 'react';

export default function VerifyFolder(props) {
    if(props.message) {
    return (
        <div className='error'>{props.message}</div>
    )
    }
    return <></>
}