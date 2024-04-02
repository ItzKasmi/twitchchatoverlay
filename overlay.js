import { getEmoteAsUrl, parseEmotesInMessage } from 'tmi-utils';

document.addEventListener("DOMContentLoaded", function() {
    const client = new tmi.Client({
        channels: [ 'nitotech' ]
    });
    
    client.connect();
    
    var chat = document.querySelector("#chat>ul");
    
    client.on('message', (channel, tags, message, self) => {
        if (self) return true;
        // emotes : { 425618: ['27-29', '31-33'] }
        const { emotes } = tags

        // `parseEmotesInMessage` splits the message up into strings and emotes
        const parsedMessage = parseEmotesInMessage(emotes, message);
        console.log(parsedMessage);

        // Then you can render the message with emotes however you like
        // const may need to be changed to var
        const newMessage = document.createElement('li');

        // Safely append each part
        parsedMessage.forEach(({ type, value, raw }) => {
            if (type === 'emote') {
                const img = new Image();
                // Converts the emote id to URL
                img.src = getEmoteAsUrl(value);
                // Raw is the original emote text (e.g. LUL)
                img.alt = raw;
                img.title = raw;

                newMessage.append(img);
            } else {
                newMessage.append(value);
            }
        });
        
        console.log(newMessage)
        chat.append(addedMessage);

        // TODO: Base code just playing around with CSS above
        // var newMessage = document.createElement('li');
        // newMessage.innerText = `${tags['display-name']}: ${message}`;
        // chat.append(newMessage);
    });
});
		