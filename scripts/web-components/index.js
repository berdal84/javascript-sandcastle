


/**
 * Declare a new component class NiceButton
 */
class CustomComponent extends HTMLElement {
    static tag = "custom-component";
    static template = `
    <style>
        .root {
            font-family:    sans-serif;
            background:     #f4f6f7;
            width:          250px;
            display:        flex;
            flex-direction: row;
            align-items:    center;
            border:         solid 1px #ddd;
            margin-bottom:  10px;
            border-radius:  10px;
            overflow:       hidden;
            color:          #444;
        }
        .details {
            margin-left:    10px;
            display:        flex;
            flex-direction: column;
            justify-items:  center;
        }
        .description {
            font-size: 12px;
        }
        h3 {
            padding: 0;
            margin:  0;
        }
        p {
            padding: 0;
            margin: 0;
        }
        img {
            height: 64px;
            filter: opacity(0.75);
        }
    </style>
    <div class="root">
        <div>
            <img/>
        </div>
        <div class="details">
            <h3></h3>
            <p class="description"></p>
        </div>
    </div>`;

    constructor() {
        super();

        // instantiate the template using shadow DOM
        const el = document.createElement('template');
        el.innerHTML = CustomComponent.template;
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(el.content.cloneNode(true));
    }

    getAttrOrDefault( attribute, fallback) {
        let val = this.getAttribute(attribute);
        if( val == null ) {
            return fallback;
        }
        return val;
    }

    get title() {
        return this.shadowRoot.querySelector('h3');
    }

    get icon() {
        return this.shadowRoot.querySelector('img');
    }

    get description() {
        return this.shadowRoot.querySelector('.description');
    }

    update() {
        this.title.innerText       = this.getAttrOrDefault('name', '<no name>');
        this.icon.src              = this.getAttrOrDefault('icon', "./icon.png");
        this.description.innerText = this.getAttrOrDefault('description', '<no description>');   
    }

    connectedCallback(){
        this.update();
        this.render();
    }
    
    render(){
        this.h3;
    }
}

// Define it as custom element to add this component using <nide-btn></nice-btn>
window.customElements.define(CustomComponent.tag, CustomComponent);

{
    const el = document.createElement(CustomComponent.tag, {is: CustomComponent.tag});
    el.setAttribute("name", "By Code");
    el.setAttribute("description", "Added 100% by code.");
    el.setAttribute("icon", "./icon.png");
    document.getElementById("content").appendChild(el);
}

{
    const el = document.createElement(CustomComponent.tag, {is: CustomComponent.tag});
      document.getElementById("content").appendChild(el);
}