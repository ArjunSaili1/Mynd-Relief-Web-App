import React from 'react'
import ChatListComponent from '../chatlist/chatList'
import styles from './styles';
import { withStyles } from '@material-ui/core';
import firebase from 'firebase/app'
import 'firebase/auth'
import ChatView from '../chatview/chatview';
import ChatBox from '../chatbox/chatbox';

class Dashboard extends React.Component {
    constructor(){
        super();
        this.state={
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            chats:[]
        };
    }

    render() {
        return (
            <div>
                <ChatListComponent 
                history={this.props.history} 
                newChatBtnFn={this.newChatBtnClicked}
                selectChatFn={this.selectChat}
                chats={this.state.chats}
                userEmail={this.state.email}
                selectedChatIndex={this.state.selectedChat}/>,
            <ChatView
                user={this.state.name}
                chat={this.state.chats[this.state.selectedChat]} />
            <ChatBox messageReadFn={this.messageRead}  submitMessageFn={this.submitMessage}/>
        </div>
        );
    }

    submitMessage = (msg) => {
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0])
        console.log(docKey)
        firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                sender: this.state.email,
                message: msg,
                timestamp: Date.now()
            }),
            receiverHasRead: false
        })
    }

    buildDocKey = (friend) => [this.state.email, friend].sort().join(':');
    newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null})

    newChatSubmit = async (chatObj) => {
        const docKey = this.buildDocKey(chatObj.sendTo);
        await 
          firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .set({
              messages: [{
                message: chatObj.message,
                sender: this.state.email
              }],
              users: [this.state.email, chatObj.sendTo],
              receiverHasRead: false
            })
        this.setState({ newChatFormVisible: false });
        this.selectChat(this.state.chats.length - 1);
      }

    selectChat = async (chatIndex) => {
        await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
        this.messageRead();
    }

    goToChat = async (docKey, msg) => {
        const usersInChat = docKey.split(':');
        const chat = this.state.chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
        this.setState({ newChatFormVisible: false });
        await this.selectChat(this.state.chats.indexOf(chat));
        this.submitMessage(msg);
      }
    
    messageRead = () => {
        const chatIndex = this.state.selectedChat;
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0]);
        if(this.clickedMessageWhereNotSender(chatIndex)) {
          firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({ receiverHasRead: true });
        } else {
          console.log('Clicked message where the user was the sender');
        }
      }
      
    clickedMessageWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if(!_usr)
                this.props.history.push('/login');
            else {
                await firebase
                .firestore()
                .collection('chats')
                .where('users', 'array-contains', _usr.email)
                .onSnapshot(async res => {
                    const chats = res.docs.map(_doc => _doc.data())
                    await this.setState({
                        email: _usr.email,
                        chats: chats
                    });
                    console.log(this.state)
                })
            }
        })
    }


}   export default withStyles(styles) (Dashboard)