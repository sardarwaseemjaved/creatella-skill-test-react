import React from 'react';
export default function Select({ onChange = () => { }, value, dataArray = [] }) {
    return (
        <select value={value} onChange={onChange} id="sort-by">
            {
                dataArray.map(type => <option value={type}>{type}</option>)
            }
        </select>
    )
}