import React from "react";
import './style.css';
import Button from '../Button';

const navTree = [
    {
        key: 'films',
        title: 'Films'
    },
    {
        key: 'species',
        title: 'Spacies'
    },
    {
        key: 'people',
        title: 'People',
    }
];

const NavBar = ({
    handleChangeCategory
}) => {
    return (
        <div className="nav">
            {navTree.map(navItem => (
                <Button 
                    onClick={() => handleChangeCategory(navItem.key)}
                    name="nav"
                    id="nav"
                >
                    {navItem.title}
                </Button>
            ))}
        </div>
    )
}

export default NavBar;