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
        const channelCode = prompt("Please enter the channel code: ")

        // Removing emojis from channel name:
        const noEmojiChannelTitle = title.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
        const noEmojiChannelCode = channelCode.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
        
        return (noEmojiChannelTitle == noEmojiChannelCode) ? id && dispatch(enterRoom({ roomId: id })) : alert("Passcode incorrect!")
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
