import React from 'react'

// Styled-components:
import styled from 'styled-components'

// Firebase:
import { db } from "../firebase"

// Redux:
import { useDispatch } from 'react-redux'
import { enterRoom } from '../features/appSlice'

function SideBarOption({ id, Icon, title, addChannelOption }) {
    const dispatch = useDispatch()

    const addChannel = () => {
        const channelName = prompt("Please enter the channel name: ")

        if (channelName) db.collection("rooms").add({
            name: channelName,
        })
    }

    const selectChannel = () => {
        if (id) dispatch(enterRoom({
            roomId: id
        }))
    }

    return (
        <SideBarOptionContainer onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
            {Icon ? (
                <h3>{title}</h3>
            ) : (
                <SideBarOptionChannel>
                    <span>#</span> {title}
                </SideBarOptionChannel>
            )}
        </SideBarOptionContainer>
    )
}

export default SideBarOption

const SideBarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;
    transition: all 400ms;

    :hover {
        opacity: 0.8;
        background-color: #340e36;
    }

    > h3 {
        font-weight: 500;
    }

    > h3 > span {
        padding-left: 40px;
    }
`

const SideBarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
`
