import React from 'react'

// Styled-components:
import styled from "styled-components"

// Material-UI:
import { Avatar } from "@material-ui/core"
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import SearchIcon from "@material-ui/icons/Search"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"

// Firebase Auth:
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'

function Header() {
    const [user] = useAuthState(auth)

    return (
        <HeaderContainer>
            <HeaderLeft>
                <HeaderAvatar src={user?.photoURL} alt={user?.displayName} />
                <HeaderSignOut>
                    <h3>{user?.displayName}</h3>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                </HeaderSignOut>
                <AccessTimeIcon />
            </HeaderLeft>

            <HeaderSearch>
                <SearchIcon />
                <input placeholder="Search" />
            </HeaderSearch>

            <HeaderRight>
                <HelpOutlineIcon />
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    background-color: var(--slack-color);
    color: white;
`

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }
`

const HeaderSignOut = styled.div`
    padding-left: 16px;
    padding-bottom: 4px;

    > span {
        font-size: 14px;
        color: white;
        cursor: pointer;
        border-bottom: 1px solid transparent;
        transition: all 400ms;

        :hover {
            opacity: 0.8;
            border-bottom: 1px solid white;
        }
    }
`

const HeaderAvatar = styled(Avatar)`

`

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    background-color: white;
    text-align: center;
    display: flex;
    padding: 0 20px;
    color: gray;
    border: 1px gray solid;

    > input {
        background-color: transparent;
        border: none;
        min-width: 36vw;
        outline: 0;
        color: black;
    }
`

const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;
    }
`
