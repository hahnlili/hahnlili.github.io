console.log("Doof");
Herbert();
console.log(Gisela(8));
console.log(Nicole("nic", "ole"));
console.log(Franziska());
console.log(gehtnicht(2, "eins"));
//CSS ok? Damit man button sieht? Nachfragen
window.onload = test;
function test() {
    VeraenderungZwei();
    document.getElementById("Cordula").addEventListener("click", Veraenderung);
}
function Veraenderung() {
    document.getElementById("Cordula").innerHTML = "Inhalt";
    wasNeues();
    nochWasNeues();
}
function VeraenderungZwei() {
    var andy = document.createElement("button");
    andy.innerHTML = "Button2";
    andy.addEventListener("click", Herbert);
    document.getElementById("einName").appendChild(andy);
}
function Herbert() {
    console.log("Herbert");
}
function Gisela(eins) {
    let zwei = 5; //selbst definierte nummer
    let frank = eins + zwei; //summe aus beiden nummern die da sind
    return frank;
}
function Nicole(eins, zwei) {
    let sum = eins + zwei;
    return sum;
}
function Franziska() {
    var ursula = "ursula";
    ursula = "nichtursula";
    return ursula;
}
function gehtnicht(eins, zwei) {
    var ergebnis = eins + zwei;
    return ergebnis;
}
function wasNeues() {
    var andy = document.createElement("article");
    andy.innerHTML = "loremIpsum";
    document.getElementById("einName").appendChild(andy);
}
function nochWasNeues() {
    var andy = document.createElement("section");
    andy.innerHTML = "BlindText";
    document.getElementById("einName").appendChild(andy);
}
//# sourceMappingURL=script.js.map