import React, { useState, useEffect } from 'react';
import { BaseButton } from './styled';

interface ButtonProps {
    type?: string,
    title: string,
    disabled: boolean
    onClick: any
}

function Button (props: ButtonProps) {
    const { title, disabled, onClick } = props;

    return (
        <BaseButton disabled={disabled} onClick={onClick}>{title}</BaseButton>
    );
}

export default Button;