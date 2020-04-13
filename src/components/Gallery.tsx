import React, { useState } from 'react'

interface Data {
    id: number;
    name: string;
    hex: string;
    saturation: string;
}

const Gallery = ({data}: {data: Data[]}) => {
    const [ filter, setFilter ] = useState<Data[] | null>()

    const selectData = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        if (value === '') {
            setFilter([])
        } else if (value !== '' && name === 'category') {
            const getFilter = data.filter(x => x.name === value);
            setFilter(getFilter)
        } else if (value !== '' && name === 'saturation') {
            const getFilter = data.filter(x => x.saturation === value);
            setFilter(getFilter)
        }
    }
    return (
        <div className="container">
            <div className="filter">
                <div className="form-input">
                    <label>By Category</label>
                    <select name="category" onChange={selectData}>
                        <option value={''}>All</option>
                        {data.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
                    </select>
                </div>
                <div className="form-input">
                    <label>By Saturation</label>
                    <select name="saturation" onChange={selectData}>
                        <option value={''}>All</option>
                        <option value="lighter">Lighter</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="darker">Darker</option>
                    </select>
                </div>
            </div>
            <div className="gallery">
                {(filter && filter.length > 0 ? filter : data).map(e => (
                    <div key={e.id} className="item-wrap">
                        <div className="item">
                            <div className="color-hex" style={{ backgroundColor: e.hex }}></div>
                            <div className="color-name">{e.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery;