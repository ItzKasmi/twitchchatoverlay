document.addEventListener("DOMContentLoaded", function() {
    const client = new tmi.Client({
        channels: [ 'nitotech' ]
    });
    
    client.connect();
    
    var chat = document.querySelector("#chat>ul");
    
    client.on('message', (channel, tags, message, self) => {
        if (self) return true;
        console.log(`${tags['display-name']}: ${message}`);
        
        var newMessage = document.createElement('li');
        var text = document.createElement("blockquote");

        newMessage.innerText = `${tags['display-name']}:`;
        text.innerText = `${message}`;
        newMessage.append(text);
        chat.append(newMessage);

        // TODO: Base code just playing around with CSS above
        // var newMessage = document.createElement('li');
        // newMessage.innerText = `${tags['display-name']}: ${message}`;
        // chat.append(newMessage);
    });
});
		