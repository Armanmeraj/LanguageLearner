export class TheScienceView {

    #theScienceView = null;

    async render() {
        this.#theScienceView = document.createElement('div');
        this.#theScienceView.innerHTML = '<h1>Later, an essay about what the science is behind the app will go here</h1>';

        return this.#theScienceView;
    }
}