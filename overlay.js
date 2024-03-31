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
        newMessage.innerText = `${tags['display-name']}: ${message}`;
        chat.append(newMessage);
    });
});
		