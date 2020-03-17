
import React, { useState, useEffect, useRef } from 'react'
import CloseButton from "../CloseButton";
import "./style.scss";

export default function Search() {

    // SET INITIAL STATE FOR query AND users
    // CREATE REF FOR SEARCH INPUT
    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])
    const focusSearch = useRef(null)

    // useEffect - FOCUS ON SEARCH INPUT
    useEffect(() => {focusSearch.current.focus()}, [])

    // FETCH API DATA
    const getusers = async (query) => {
        const results = await fetch(`http://localhost:3005/search?q=${query}`, {
            headers: {'accept': 'application/json'}
        })
        const usersData = await results.json()
        
        return usersData.hits.hit
    }

    // PREVENTS RERENDER FLICKERING AS USER TYPES IN SEARCH
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    // useEffect - ONLY RERENDERS WHEN query IS CHANGED
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

    // RENDER users 
    let usersComponents = users.map((user, index) => {
        return (
            <li key={index}>
               <a href={user.fields.fullPassport}><h1>{user.fields.name}</h1></a>
            </li>
        )
    })

    // RENDER COMPONENT
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














// import React, { useState, useEffect, useRef } from 'react'
// import CloseButton from "../CloseButton";
// import "./style.scss";

// export default function Search() {

//     const [query, setQuery] = useState('')
//     const [users, setUsers] = useState([])
//     const focusSearch = useRef(null)

//     useEffect(() => { focusSearch.current.focus() }, [])

//     const getUsers = async (query) => {
//         const results = await fetch(`http://localhost:3005/search?q=${query}`)
//         const usersData = await results.json()
//         console.log("this is the results", results, "this is the data", usersData);

//         return usersData.results
//     }

//     const sleep = (ms) => {
//         return new Promise(resolve => setTimeout(resolve, ms))
//     }

//     useEffect(() => {
//         let currentQuery = true
//         const controller = new AbortController()

//         const loadUsers = async () => {
//             if (!query) return setUsers([])

//             await sleep(350)
//             if (currentQuery) {
//                 const users = await getUsers(query, controller)
//                 setUsers(users)
//             }
//         }
//         loadUsers()

//         return () => {
//             currentQuery = false
//             controller.abort()
//         }
//     }, [query])



//     return (
//         <div className="search-overlay">

//             <div className="search-bar">
//                 <input
//                     type="email"
//                     placeholder="Search..."
//                     ref={focusSearch}
//                     onChange={(e) => setQuery(e.target.value)}
//                     value={query}
//                 />
//             </div>

//             <div className="results">
//                 {users.map((user, index) => {
//                     return (
//                         <li>
//                             {user.name}
//                         </li>
//                     )
//                 })}
//             </div>

//             <CloseButton />

//         </div>
//     )
// }
