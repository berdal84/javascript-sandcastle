
/**
 * Declare a new component class NiceButton
 */
class NiceButton extends HTMLElement {

}

// Define it as custom element to add this component using <nide-btn></nice-btn>
window.customElements.define('nice-btn', NiceButton);


const btn = document.createElement('nice-btn')
document.body.appendChild(btn);
const content = document.getElementById("content");
if( !content ) {
    alert("content div not found!")
}
content.appendChild(btn);