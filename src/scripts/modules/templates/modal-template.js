import { html, render } from 'lighterhtml';

export const modalTemplate = function modalTemplate (data, node, saveFunct, saveUpdateFunct, closeFunct) {
    render(node, html`
        ${
            data.map((info, i) => html`
            <a href="#close" class="modal-overlay" aria-label="Close">
            <div class="modal-container">
                <div class="modal-header">
                <div class="btn btn-clear float-right close-character-modal" aria-label="Close"></div>
                <ul class="tab tab-block modal-nav-tabs">
                    <li class="tab-item tab-item-human">
                        <a href="#" data-type="human" class="modal-tab active">Human
                    </li>
                    <li class="tab-item tab-item-monster">
                        <a href="#" data-type="monster" class="modal-tab">Monster
                    </li>
                    <li class="tab-item tab-item-animal">
                        <a href="#" data-type="animal" class="modal-tab">Animal
                    </li>
                </ul>
                </div>
                <div class="modal-body">
                <div class="content">

                    <form class="creator-form">

                    </form>
                </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success save-character">Save Character</button>
                </div>
            </div>
            `)
        }
    `)

    // function deleteCharacter (id) {
    //     deleteFunct(id);
    // }

    // function editCharacter (id) {
    //     updateFunct(id);
    // }
}

// function awakenedAnimal (data) {
//     if (data.basic.type === "animal") {
//         return html`
//         <div><span class="re-line-title">&nbsp;Awakened:&nbsp;</span> ${data.basic.awakened ? "Yes" : "No"}</div>
//         `
//     }
//     return ``
// }