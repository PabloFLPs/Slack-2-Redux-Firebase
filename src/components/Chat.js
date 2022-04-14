import React, { useEffect, useRef } from 'react'

// Styled-components:
import styled from "styled-components"

// Material UI:
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

// Redux:
import { useSelector } from "react-redux"
import { selectRoomId } from '../features/appSlice'

// Components:
import ChatInput from "../components/ChatInput"
import Message from "../components/Message"

// Firebase:
import { db } from '../firebase'
import { useCollection, useDocument } from "react-firebase-hooks/firestore"

function Chat() {
    const roomId = useSelector(selectRoomId)

    const [roomDetails] = useDocument(
        roomId && db.collection("rooms").doc(roomId)
    )

    const [roomMessages, loading] = useCollection(
        roomId && db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc")
    )

    console.log("RoomDetails:", roomDetails?.data())
    console.log("RoomMessages:", roomMessages)

    const channelName = roomDetails?.data().name

    const chatReference = useRef(null)

    useEffect(() => {
        chatReference?.current?.scrollIntoView({
            behavior: "smooth",
        })
    }, [roomId, roomMessages, loading])

    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4><strong>{channelName ? `#${channelName.replace(" ", "-")}` : "Select a channel"}</strong></h4>
                            <StarBorderOutlinedIcon />
                        </HeaderLeft>

                        <HeaderRight>
                            <p>
                                <InfoOutlinedIcon />
                                Details
                            </p>
                        </HeaderRight>
                    </Header>
                    <ChatMessages>
                        {roomMessages?.docs.map((doc) => {
                            const { message, timestamp, user, userImage } = doc.data()

                            return (
                                <Message key={doc.id} message={message} timestamp={timestamp} user={user} userImage={userImage} />
                            )
                        })}
                        <ChatBottom ref={chatReference} />
                    </ChatMessages>
                    <ChatInput channelId={roomId} channelName={channelName} chatReference={chatReference} />
                </>
            )}
        </ChatContainer>
    )
}

export default Chat

const ChatContainer = styled.div `
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 22.5px;
    border-bottom: 1px solid lightgray;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    > h4 {
        display: flex;
        margin-right: 10px;
    }

    > h4 .MuiSvgIcon-root{
        margin-left: 10px;
        font-size: 18px;
    }
`

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`

const ChatMessages = styled.div`
    
`

const ChatBottom = styled.div`
    padding-bottom: 100px;
`
