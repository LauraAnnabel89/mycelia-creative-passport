
import React, { useState, useEffect, useRef } from 'react'
import SearchBar from "./SearchBar";
import CloseButton from "../CloseButton";
import fetchUsers from "../Scene3D/data/fetchUsers";
import "./style.scss";

export default function Search() {

    // SET INITIAL STATE FOR query AND jokes
    // CREATE REF FOR SEARCH INPUT
    const [query, setQuery] = useState('')
    const [jokes, setJokes] = useState([])
    const focusSearch = useRef(null)

    // useEffect - FOCUS ON SEARCH INPUT
    useEffect(() => {focusSearch.current.focus()}, [])

    // FETCH API DATA
    const getJokes = async (query) => {
        const results = await fetch(`http://localhost:3005/users?`+`q=${query}`)      
        const jokesData = await results.json()
        console.log(jokesData);

        return jokesData.results
    }

    // PREVENTS RERENDER FLICKERING AS USER TYPES IN SEARCH
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    // useEffect - ONLY RERENDERS WHEN query IS CHANGED
    useEffect(() => {
        let currentQuery = true
        const controller = new AbortController()

        const loadJokes = async () => {
            if (!query) return setJokes([])

            await sleep(350) 
            if (currentQuery) {
                const jokes = await getJokes(query, controller)
                setJokes(jokes)
            }
        }
        loadJokes()

        return () => {
            currentQuery = false
            controller.abort()
        }
    }, [query])

    // // RENDER JOKES 
    // let jokeComponents = jokes.map((joke, index) => {
    //   console.log(joke);
      
    //     return (
    //         <li key={index}>
    //             {joke.joke}
    //         </li>
    //     )
    // })

    // RENDER COMPONENT
    return (
        <>
  
            <div className="search-overlay">
                <input
                    type="email" 
                    placeholder="Search for a Joke..." 
                    ref={focusSearch}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query} 
                />
            </div>     

                {jokes}
     
  
        </>
    )
}










// import React, { useEffect, useReducer } from "react";
// import SearchBar from "./SearchBar";
// import CloseButton from "../CloseButton";
// // import fetchUsers from "../Scene3D/data/fetchUsers";
// import "./style.scss";

// const MOVIE_API_URL = "https://eus483eenc.execute-api.eu-west-2.amazonaws.com/TestGate/get-users";

// const initialState = {
//   loading: true,
//   users: [],
//   errorMessage: null,
//   searchOverlay: false
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SEARCH_MOVIES_REQUEST":
//       return {
//         ...state,
//         loading: true,
//         errorMessage: null
//       };
//     case "SEARCH_MOVIES_SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         movies: action.payload
//       };
//     case "SEARCH_MOVIES_FAILURE":
//       return {
//         ...state,
//         loading: false,
//         errorMessage: action.error
//       };
//     default:
//       return state;
//   }
// };

// const Search = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     fetch(MOVIE_API_URL)
//       .then(response => response.json())
//       .then(jsonResponse => {
//         dispatch({
//           type: "SEARCH_MOVIES_SUCCESS",
//           payload: jsonResponse.Search
//         });
//       });
//   }, []);

//   const search = searchValue => {
//     dispatch({
//       type: "SEARCH_MOVIES_REQUEST"
//     });

//     fetch(`https://eus483eenc.execute-api.eu-west-2.amazonaws.com/TestGate/get-users?s=${searchValue}`)
//       .then(response => response.json())
//       .then(console.log(users))
//       .then(jsonResponse => {
//         if (jsonResponse.Response === "True") {
//           dispatch({
//             type: "SEARCH_MOVIES_SUCCESS",
//             payload: jsonResponse.Search
//           });
//         } else {
//           dispatch({
//             type: "SEARCH_MOVIES_FAILURE",
//             error: jsonResponse.Error
//           });
//         }
//       });
//   };

//   const { users, errorMessage, loading } = state;

//   return (
//     <>
//       <div className="search-overlay">
//         <SearchBar search={search} />
//         <div className="results">
//         {loading && !errorMessage ? (
//             <span>loading...</span>
//           ) : errorMessage ? (
//             <div className="errorMessage">{errorMessage}</div>
//           ) : (
//             users.map((user, index) => (
//                {user}
//             ))
//           )}
//         </div>
//         <CloseButton />
//       </div>
//     </>
//   );
// };

// export default Search;
