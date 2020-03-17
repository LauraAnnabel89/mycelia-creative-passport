
import React, { useState, useEffect, useRef } from 'react'
import CloseButton from "../CloseButton";
import "./style.scss";

export default function Search() {

    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])
    const [error, setError] = useState(false);
    const focusSearch = useRef(null)

    useEffect(() => { focusSearch.current.focus() }, [])

    const getusers = async (query) => {
        setError(false);
        try {
            const results = await fetch(`http://localhost:3005/search?q=${query}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                }
            })
            const usersData = await results.json()
            return usersData.hits.hit
        }
        catch (error) {
            setError(true);
        }

    }


    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    useEffect(() => {
        let currentQuery = true
        const controller = new AbortController()

        const loadusers = async () => {
            if (!query) return setUsers([])

            await sleep(350)
            if (currentQuery) {
                const users = await getusers(query, controller)
                setUsers(users)
            }
        }
        loadusers()

        return () => {
            currentQuery = false
            controller.abort()
        }
    }, [query])

    let usersComponents = users.map((user, index) => {
        return (
            <li key={user.id}>
                <a href={user.fields.fullPassport}><h1>{user.fields.name}</h1></a>
            </li>
        )
    })

    return (
        <div className="search-overlay">

            <div className="search-bar" id="search-bar">
                <input
                    type="email"
                    placeholder="Search..."
                    ref={focusSearch}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
            </div>

            <ul className="results">
                {usersComponents}
            </ul>

            <CloseButton />
        </div>
    )
}









