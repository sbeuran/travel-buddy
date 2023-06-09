import React, { useState, useEffect } from 'react';

interface ButtonProps {
    type?: string,
    title: string,
    disabled: boolean
    onClick: any
}

function Button (props: ButtonProps) {
    const { title, disabled, onClick } = props;

    return (
        <button className='normal-btn' disabled={disabled} onClick={onClick}>{title}</button>
    );
}

export default Button;