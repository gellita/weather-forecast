import React from 'react';

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => (
    <input type="text" value={value} onChange={onChange} placeholder="enter city"/>
);

export default Input;
