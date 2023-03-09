import React from "react";
import './style.css';
import Button from '../Button';
import { useDispatch, useSelector } from "react-redux";

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

const NavBar = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.ui.theme);

    const handleChangeCategory = (category) => 
        dispatch({type: 'CATEGORY/SET', payload: category});
    
    const handleChangeTheme = () => {
        dispatch({type: 'THEME/TOGGLE'});
    }

    return (
        <div className="nav">
            <button onClick={handleChangeTheme}>{
                theme === 'light' ? 'Dark' : 'Light'}
            </button>
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