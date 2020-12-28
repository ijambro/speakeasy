const voices = require("./config/voices.json");
const messages = require("./data/messages.json");

const { exec, execSync } = require("child_process");

const DEFAULT_VOICE = "Fiona";

console.log("Launching SpeakEasy...");

// IIFE pattern to run main code asynchronously, 
// which is not actually necessary because there are no async calls.
(async () => {
    execSync(buildSystemCommand("Welcome to SpeakEasy"));

    for (user in messages) {
        execSync(buildSystemCommand(user + " said..."));
        execSync(buildMessageCommand(user));
    }

    execSync(buildSystemCommand("You're all caught up!  If you enjoyed SpeakEasy. Please tell a friend."));
})();

function buildMessageCommand(userName) {
    let voice = voices[userName];
    let message = messages[userName];
    return buildSayCommand(voice, message);
}

function buildSystemCommand(message) {
    return buildSayCommand(DEFAULT_VOICE, message);
}

function buildSayCommand(voice, message) {
    let command = "say -v " + voice + " \"" + message + "\"";
    console.log(command);
    return command;
}