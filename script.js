async function GetInfo() {
    var server_url = 'https://quizlet-clone-backend.332s-21094.repl.co/info';
    return axios.get(server_url);
}

var result_text = document.querySelector("#search-result-title");

var word = document.querySelector("#--word");
var word_box = document.querySelector("#main > #word-box > div");

var word_set = document.querySelector("#--word-set");
var set_box = document.querySelector("#main > #set-box > div");

var init_set_backup = null;

GetInfo().then((res) => {
    if (!res) { return }
    res.data.forEach((data) => {
        LoadingEnd();
        // console.log(data);
        AddSet(
            data["name"],
            data["count"] + "단어",
            "Updated on " + data["update"]
        );
    })

    init_set_backup = set_box.cloneNode(true).innerHTML;
});

let timeout;
document.querySelector("#search-keyword").addEventListener('input', (e) => {
    // 이전에 생성한 setTimeout() 이벤트를 중단합니다.
    console.log("검색 취소");
    clearTimeout(timeout);

    if (e.target.value == "") {
        set_box.innerHTML = init_set_backup;
        word_box.innerHTML = "";
        word_box.parentElement.style.display = "none";
        set_box.parentElement.style.display = "block";
        result_text.style.display = "none";
        document.title = "단어 학습 : Wemory 웨모리";
        LoadingEnd();
    }
    else{
        LoadingStart();
        set_box.parentElement.style.display = "none";
        result_text.style.display = "block";
        document.title = `검색 '${e.target.value}'`;
        result_text.innerText = `'${e.target.value}' 검색 중...`;
        // 새로운 setTimeout() 이벤트를 생성합니다.
        timeout = setTimeout(() => {
            set_box.innerHTML = "";
            word_box.innerHTML = "";
            console.log("검색중");
            GetSearchResult(e.target.value).then((res) => {
                LoadingEnd();
                result_text.innerText = `'${e.target.value}'의 검색 결과`;
                if (!res) { return }
                if (res.data.length <= 0) {
                    console.log("검색 결과 없음")
                    result_text.innerText = `'${e.target.value}' 검색 결과 없음`;
                    return
                }
                res.data.forEach((data) => {
                    if (data["type"] == "set") {
                        AddSet(
                            data["name"],
                            data["count"] + "단어",
                            "Updated on " + data["update"]
                        );
                    }
                    else if (data["type"] == "word") {
                        AddWord(
                            data["english"],
                            data["korean"]
                        );
                    }
                })
            });
        }, 1000);
    }

});

function GetSearchResult(keyword) {
    var server_url = 'https://quizlet-clone-backend.332s-21094.repl.co/search/' + keyword.replace(" ", "-");
    return axios.get(server_url);
}

function AddSet(name, count, date) {
    var new_set = word_set.content.cloneNode(true);
    set_box.parentElement.style.display = "block";
    new_set.querySelector("#title").innerText = name;
    new_set.querySelector("#date").innerText = date;
    new_set.querySelector("#count").innerText = count;
    new_set.querySelector("a").href = `./show/index.html?day=${name.split(" ")[1]}`;
    // 추가
    set_box.appendChild(new_set);
}

function AddWord(english, korean) {
    word_box.parentElement.style.display = "block";
    var new_word = word.content.cloneNode(true);
    new_word.querySelector("#english").innerText = english;
    new_word.querySelector("#korean").innerText = korean;
    // 추가
    word_box.appendChild(new_word);
}

function LoadingStart() {
    document.querySelector("#loading-screen").style.visibility = "visible";
}

function LoadingEnd() {
    document.querySelector("#loading-screen").style.visibility = "hidden";
}