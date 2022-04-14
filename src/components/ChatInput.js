import React, { useState } from 'react'

// Styled-components:
import styled from "styled-components"

// Material UI:
import { Button } from "@material-ui/core"

// Firebase:
import firebase from "firebase/compat/app"
import { auth, db } from "../firebase"
import { useAuthState } from 'react-firebase-hooks/auth'

function ChatInput({ channelName, channelId, chatReference }) {
    const [input, setInput] = useState("")

    const [user] = useAuthState(auth)

    console.log(user.photoURL)

    const sendMessage = (event) => {
        // Preventing Page Refresh
        event.preventDefault()

        if (!channelId) return false

        db.collection("rooms").doc(channelId).collection("messages").add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL,
        })

        chatReference?.current?.scrollIntoView({
            behavior: "smooth",
        })

        setInput("")
    }

    return (
        <ChatInputContainer>
            <form action="">
                <input type="text" placeholder={channelName ? `Message #${channelName.replace(" ", "-")}` : "Select a channel"} value={input} onChange={(event) => setInput(event.target.value)} required />
                <Button hidden type="submit" onClick={sendMessage} required>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }
`
