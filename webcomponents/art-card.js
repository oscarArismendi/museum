class ArtCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('.card').addEventListener('click', () => this.flipCard());
    }

    render() {
        const imageUrl = this.getAttribute('image-url');
        const title = this.getAttribute('title');
        const author = this.getAttribute('author');
        const description = this.getAttribute('description');

        this.shadowRoot.innerHTML = `
            <style>
                ${this.getStyles()}
            </style>
            <div class="card">
                <div class="card-face card-front">
                    <img src="${imageUrl}" alt="${title}" class="card-image">
                </div>
                <div class="card-face card-back">
                    <h2 class="card-title">${title}</h2>
                    <p class="card-author">by ${author}</p>
                    <p class="card-description">${description}</p>
                </div>
            </div>
        `;
    }

    getStyles() {
        return `


        .card {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.6s;
        }

        .card.flipped {
            transform: rotateY(180deg);
        }

        .card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .card-front {
            background-color: #f0f0f0;
        }

        .card-back {
            background-color: #ffffff;
            transform: rotateY(180deg);
            padding: 20px;
            box-sizing: border-box;
            color: blue;
        }

        .card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .card-title {
            font-size: 1.5em;
            margin-bottom: 10px;
        }

        .card-author {
            font-style: italic;
            margin-bottom: 10px;
        }

        .card-description {
            font-size: 0.9em;
            text-align: justify;
            font-weight: 600;
            color: #1700ff;
        }
        `;
    }

    flipCard() {
        this.shadowRoot.querySelector('.card').classList.toggle('flipped');
    }
}

customElements.define('art-card', ArtCard);