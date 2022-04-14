import React from 'react'

// Styled-components:
import styled from "styled-components"

// Material-UI:
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CreateIcon from '@material-ui/icons/Create'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import AppsIcon from '@material-ui/icons/Apps'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'

// Components:
import SideBarOption from './SideBarOption'

// Firebase:
import { db } from "../firebase"

// React Firebase Hooks:
import { useCollection } from "react-firebase-hooks/firestore"

function SideBar() {
    const [channels, loading, error] = useCollection(db.collection("rooms"))

    //console.log(channels)

    return (
        <SideBarContainer>
            <SideBarHeader>
                <SideBarInfo>
                    <h2>FELPs Workspace</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        Pablo FELPs
                    </h3>
                </SideBarInfo>
                <CreateIcon />
            </SideBarHeader>

            <SideBarOption Icon={InsertCommentIcon} title="Threads" />
            <SideBarOption Icon={InboxIcon} title="Mentions & Reactions" />
            <SideBarOption Icon={DraftsIcon} title="Saved Items" />
            <SideBarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
            <SideBarOption Icon={PeopleAltIcon} title="People & User Groups" />
            <SideBarOption Icon={AppsIcon} title="Apps" />
            <SideBarOption Icon={FileCopyIcon} title="File Browser" />
            <SideBarOption Icon={ExpandLessIcon} title="Show Less" />
            <hr />
            <SideBarOption Icon={ExpandMoreIcon} title="Channels" />
            <hr />
            <SideBarOption Icon={AddIcon} addChannelOption title="Add Channel" />

            {channels?.docs.map((doc) => (
                <SideBarOption key={doc.id} id={doc.id} title={doc.data().name} />
            ))}
        </SideBarContainer>
    )
}

export default SideBar

const SideBarContainer = styled.div`
    color: white;
    background-color: var(--slack-color);
    flex: 0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;
    overflow-y: scroll;

    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #49274b;
    }
`

const SideBarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;

    > .MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
    }
`

const SideBarInfo = styled.div`
    flex: 1;

    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`
