import { SetUrl, GetQueryOf } from "../module/urlQuery.js";

SetUrl(document.location.href);

async function GetInfo() {
    var server_url = 'https://quizlet-clone-backend.332s-21094.repl.co/day/' + GetQueryOf("day");
    return axios.get(server_url);
}

var word = [];

GetInfo().then((res) => {
    LoadingEnd();
    document.querySelector("#set-name").innerText = `Day ${GetQueryOf("day")}`;
    document.querySelector("#playground").style.visibility = "visible";
    document.title = `Day ${GetQueryOf("day")}`;
    if (!res) { return }
    else {
        word = res.data;
        console.log(word);
        StartPlay();
    }
});

function LoadingStart() {
    document.querySelector("#loading-screen").style.visibility = "visible";
}

function LoadingEnd() {
    document.querySelector("#loading-screen").style.visibility = "hidden";
}

function StartPlay() {
    
}