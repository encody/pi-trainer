/*jshint browser: true, devel: true*/
(function () {
    var pi, loadingEl, piTextEl, piEntryEl, piDigitsCountEl, piHintEl, entered = "", keys;

    keys = {
        48: 0,
        49: 1,
        50: 2,
        51: 3,
        52: 4,
        53: 5,
        54: 6,
        55: 7,
        56: 8,
        57: 9,
        96: 0,
        97: 1,
        98: 2,
        99: 3,
        100: 4,
        101: 5,
        102: 6,
        103: 7,
        104: 8,
        105: 9
    };

    if (document.readyState === "complete")
        init();
    else
        document.addEventListener("readystatechange", function () {
            if (document.readyState === "complete")
                init();
        });

    function init () {
        loadingEl = document.getElementById("loading");
        piTextEl = document.getElementById("pi-text");
        piEntryEl = document.getElementById("pi-entry");
        piDigitsCountEl = document.getElementById("pi-digits-count");
        piHintEl = document.getElementById("pi-hint");

        piDigitsCountEl.addEventListener("click", function () {
            entered = "";
            piEntryEl.innerText = "";
            piHintEl.innerHTML = "&nbsp;";
            piHintEl.style.backgroundColor = "";
            piDigitsCountEl.innerText = "0";
        });

        piHintEl.addEventListener("click", function () {
            piHintEl.innerText = pi.charAt(entered.length);
            piHintEl.style.backgroundColor = "transparent";
        });

        console.log("Loading pi from file \"./pi.txt\" - Go ahead and study it if you wish. Thanks to http://www.geom.uiuc.edu/~huberty/math5337/groupe/digits.html for 100,000 digits of PI!");
        pi = getPI();
        console.log("Pi finished loading.");
        loadingEl.style.display = "none";
        piTextEl.style.display = "block";

        window.addEventListener("keydown", function (e) {
            var keyCode = e.which || e.keyCode;
            if (keyCode === 8 && entered.length > 0) {
                entered = entered.substring(0, entered.length - 1);
                e.preventDefault();
            } else if (keys[keyCode] !== undefined) {
                if (pi.charAt(entered.length) === keys[keyCode].toString()) {
                    entered = entered + "" + keys[keyCode].toString();
                    piHintEl.innerHTML = "&nbsp;";
                    piHintEl.style.backgroundColor = "";
                } else {
                    piHintEl.innerText = pi.charAt(entered.length);
                    piHintEl.style.backgroundColor = "transparent";
                }
            }
            piEntryEl.innerText = entered;
            piDigitsCountEl.innerText = "" + entered.length;
        });

        setInterval(function () {
            document.body.scrollLeft += 10;
        }, 1);
    }

    function getPI () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "pi.txt", false);
        xhr.send();
        return xhr.responseText;
    }
})();
