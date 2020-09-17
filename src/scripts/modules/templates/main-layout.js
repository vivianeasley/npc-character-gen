import { html, render } from 'lighterhtml';
import {creatureInfoTemplate} from "./creatures-info-template";
import {creatureFormTemplate} from "./creature-form-template"

export const mainLayout = function mainLayout (node, data, uiData, saveFunct, closeFunct, deleteFunct, editFunct, tabSelectFunct, sliderUpdateFunct, awakeAnimalFunct) {
    render(node, html`
        <div class="saved-creatures">${creatureInfoTemplate(data, deleteFunct, editFunct)}</div>

        <div class="${uiData.isModalOpen ? "modal character-gen-modal active" : "modal character-gen-modal"}" id="character-gen-modal">
            <a href="#close" class="modal-overlay" onclick="${closeFunct}" aria-label="Close"></a>
            <div class="modal-container">
                <div class="modal-header">
                <div class="btn btn-clear float-right close-character-modal" onclick="${closeFunct}" aria-label="Close"></div>
                    ${tabs(uiData)}
                </div>
                <div class="modal-body">
                <div class="content">

                    <form class="creator-form">
                        ${creatureFormTemplate(uiData, sliderUpdateFunct, awakeAnimalFunct)}
                    </form>
                </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success save-character" onclick="${saveFunct}">Save Character</button>
                </div>
            </div>
        </div>
    `)

    function tabs (data) {
       if (data.isUpdating) {
            return html`<h3>Updating a ${data.updatingCreature.basic.type} NPC</h3>`
        } else {
            return html`
                <ul class="tab tab-block modal-nav-tabs">
                    <li class="${data.selectedCreatureType === "human" ? "tab-item tab-item-human active" : "tab-item tab-item-human"}">
                        <a href="#" class="modal-tab" onclick="${()=>{tabSelectFunct("human")}}">Human</a>
                    </li>
                    <li class="${data.selectedCreatureType === "monster" ? "tab-item tab-item-human active" : "tab-item tab-item-human"}">
                        <a href="#" class="modal-tab" onclick="${()=>{tabSelectFunct("monster")}}">Monster</a>
                    </li>
                    <li class="${data.selectedCreatureType === "animal" ? "tab-item tab-item-human active" : "tab-item tab-item-human"}">
                        <a href="#" class="modal-tab" onclick="${()=>{tabSelectFunct("animal")}}">Animal</a>
                    </li>
                </ul>
            `
        }
    }

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