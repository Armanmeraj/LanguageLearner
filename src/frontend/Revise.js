export class Revise {

    #reviseView = null;

    async render() {

        this.#reviseView = document.createElement('div');
        this.#reviseView.innerHTML = '<h1>Page for revision</h1>';

        return this.#reviseView;
    }
}