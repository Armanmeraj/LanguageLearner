export class Memorize {

    #memorizeView = null;

    async render() {

        this.#memorizeView = document.createElement('div');
        this.#memorizeView.innerHTML = '<h1>Page for memorization practice</h1>';

        return this.#memorizeView;
    }
}