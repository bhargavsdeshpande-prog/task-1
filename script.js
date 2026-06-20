async function translateText() {

    const text = document.getElementById("inputText").value;
    const source = document.getElementById("sourceLang").value;
    const target = document.getElementById("targetLang").value;

    if (text.trim() === "") {
        alert("Please enter some text.");
        return;
    }

    document.getElementById("result").innerText = "Translating...";

    try {

        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
        );

        const data = await response.json();

        document.getElementById("result").innerText =
            data.responseData.translatedText;

    } catch (error) {

        document.getElementById("result").innerText =
            "Translation failed.";

        console.log(error);
    }
}

function copyText() {

    const translatedText =
        document.getElementById("result").innerText;

    if (translatedText === "") {
        alert("Nothing to copy.");
        return;
    }

    navigator.clipboard.writeText(translatedText);

    alert("Copied Successfully!");
}

function speakText() {
    const text = document.getElementById("result").innerText;

    if (!text || text.trim() === "" || text === "Translating..." || text === "Translation failed.") {
        alert("No valid translated text to speak.");
        return;
    }

    const msg = new SpeechSynthesisUtterance(text);

    const targetLang = document.getElementById("targetLang").value;

    // Better language mapping
    const langMap = {
        en: "en-US",
        hi: "hi-IN",
        es: "es-ES",
        fr: "fr-FR",
        de: "de-DE",
        it: "it-IT",
        ja: "ja-JP",
        ko: "ko-KR",
        zh: "zh-CN"
    };

    msg.lang = langMap[targetLang] || "en-US";

    // Wait for voices to load (IMPORTANT FIX)
    let voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.speak(msg);
        };
    } else {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(msg);
    }
}