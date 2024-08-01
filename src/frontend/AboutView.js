export class AboutView {

    #aboutView = null;

    async render() {
        this.#aboutView = document.createElement('div');
        this.#aboutView.innerHTML = '<h1>Later, an essay about what the website is about and features will go here</h1>';

        return this.#aboutView;
    }
}