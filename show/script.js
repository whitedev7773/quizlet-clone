import { SetUrl, GetQueryOf } from "../module/urlQuery.js";

SetUrl(document.location.href);

async function GetInfo() {
    var server_url = 'https://quizlet-clone-backend.332s-21094.repl.co/day/' + GetQueryOf("day");
    return axios.get(server_url);
}

var word = document.querySelector("#--word");
var word_box = document.querySelector("#main > #word-box > div");

GetInfo().then((res) => {
    LoadingEnd();
    document.querySelector("#play-link").href = `../play/index.html?day=${GetQueryOf("day")}`;
    document.querySelector("#set-name").innerText = `Day ${GetQueryOf("day")}`;
    document.title = `Day ${GetQueryOf("day")}`;
    if (!res) { return }
    res.data.forEach((data) => {
        // console.log(data);
        data = data.split(", ")
        AddWord(
            data[0],
            data[1]
        );
    })
});

function AddWord(english, korean) {
    word_box.parentElement.style.display = "block";
    var new_word = word.content.cloneNode(true);
    new_word.querySelector("#english").innerText = english;
    new_word.querySelector("#korean").innerText = korean;
    if (korean.length >= 25) {
        new_word.querySelector("#korean").classList.add("move");
    }
    // 추가
    word_box.appendChild(new_word);
}

function LoadingStart() {
    document.querySelector("#loading-screen").style.visibility = "visible";
}

function LoadingEnd() {
    document.querySelector("#loading-screen").style.visibility = "hidden";
}