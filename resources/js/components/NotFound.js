import React from 'react'
import {Link} from 'react-router-dom'

export const NotFound = () => {
    return (
        <div>
            Page not found

            <Link to='/'>Return to home</Link>
        </div>
    )
}

export default NotFound
