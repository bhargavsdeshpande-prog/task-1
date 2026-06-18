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

    navigator.clipboard.writeText(translatedText);

    alert("Translation copied successfully!");
}