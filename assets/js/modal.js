class Modal {
    #modalElement
    #wrapper

    constructor() {
        this.#modalElement = document.createElement('div');
        this.#modalElement.id = 'modal';
        this.#createCloseButton();
        this.#createWrapper();

        this.hide();

        document.body.append(this.#modalElement);
    }

    #createWrapper() {
        this.#wrapper = document.createElement('div');
        this.#modalElement.append(this.#wrapper);
    }

    #createCloseButton() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
        button.classList.add('closeBtn')
        button.onclick = this.hide.bind(this);
        button.addEventListener('click', function fixTableStyle(){
            document.querySelector('table').style.pointerEvents = 'auto'
            document.querySelector('table').classList.remove('filterTable')
    
        })
        this.#modalElement.append(button);
    }

  

    show() {
        this.#modalElement.style.display = 'block'
        
    }

    hide() {
        this.#modalElement.style.display = 'none'
        this.#wrapper.replaceChildren([]);
    }

    populateModal(content) {
        this.#wrapper.append(content);
    }
}

const modal = new Modal();

export default modal;