import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { LOAD_USERS } from '../GraphQL/Queries'
import UserTable from './UserTable'
import CountryCodeLengthChart from './CountryCodeLengthChart'

const GetUsers = () => {
    const { error, loading, data } = useQuery(LOAD_USERS)
    const [getCountries, setGetCountries] = useState([])
    const [nameFilter, setNameFilter] = useState('')
    const [codeLengthFilter, setCodeLengthFilter] = useState('')

    useEffect(() => {
        if (data) {
            console.log(data.countries)
            setGetCountries(data.countries)
        }
    }, [data])

    const filteredData = getCountries.filter((country) => {

        const nameMatch = country.name.toLowerCase().includes(nameFilter.toLowerCase()) || !nameFilter;

        const codeMatch = !codeLengthFilter || country.code.length === parseInt(codeLengthFilter);

        return nameMatch && codeMatch;
    });

    return (
        <div>
            <label>
                Filter by Country Name:
                <input
                    type="text"
                    value={nameFilter}
                    onChange={e => setNameFilter(e.target.value)}
                />
            </label>

            <label>
                Filter by Code Length:
                <select
                    value={codeLengthFilter}
                    onChange={e => setCodeLengthFilter(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="2">2 Characters</option>
                    <option value="3">3 Characters</option>
                </select>
            </label>
            <div>
                <UserTable allData={filteredData} />
                <CountryCodeLengthChart allData={filteredData} /></div>
        </div>
    )
}

export default GetUsers
