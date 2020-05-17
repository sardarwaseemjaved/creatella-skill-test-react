import React from 'react';
export default function ({ dataArray = [] }) {
    return (
        <div id="products" className="products">
            {
                dataArray.map((item, index) => (
                    <div key={index}>
                        <h2>{item.face}</h2>
                        <p>Index:{index}</p>
                        <p>Price:{item.size}</p>
                        <p>date:{item.date}</p>
                        <p>Size:{item.size}</p>
                    </div>
                ))
            }
        </div>
    )
}