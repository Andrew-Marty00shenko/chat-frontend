import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import './Home.scss';
import Messages from '../../containers/Messages';
import ChatInput from '../../containers/ChatInput';
import Status from '../../containers/Status';
import Sidebar from '../../containers/Sidebar';
import { dialogsActions } from '../../redux/actions';

const Home = ({ setCurrentDialogId }) => {
    let location = useLocation();

    useEffect(() => {
        const { pathname } = location;
        const dialogId = pathname.split('/').pop();
        setCurrentDialogId(dialogId);
    }, [location.pathname, location, setCurrentDialogId]);

    return (
        < section className="home">

            <div className="chat">
                <Sidebar />
                <div className="chat__dialog">
                    <Status />
                    <Messages />
                    <div className="chat__dialog-input">
                        <ChatInput />
                    </div>
                </div>
            </div>
        </section >
    )
}

export default connect(({ dialogs }) => dialogs, dialogsActions)(Home);






