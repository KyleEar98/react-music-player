import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Nav = ({setLibraryStatus, libraryStatus}) => {
    return(
        <nav>
            <h1>Waves</h1>
            {/* setting libraryStatus to the opposite when we click button  */}
            <button onClick={() => setLibraryStatus(!libraryStatus)} >
                Library 
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    );
};

export default Nav;