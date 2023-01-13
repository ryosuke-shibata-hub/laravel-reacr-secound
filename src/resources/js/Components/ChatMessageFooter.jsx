export default function ChatMessageFooter(props) {
    const chatMessage = props.chatMessage;
    const dt = new Date(chatMessage.created_at);
    const data = dt.toLocaleString('js-JP');

    return (
        <>
            <small className="text-gray-400">{data}</small>
        </>
    )
}
