import { html } from 'lighterhtml';

export const creatureInfoTemplate = function creatureInfoTemplate (data, deleteFunct, updateFunct) {
    function deleteCharacter (id) {
        deleteFunct(id);
    }

    function editCharacter (id) {
        updateFunct(id);
    }

    return html`
        ${
            data.map((info, i) => html`
                <div class="card re-card-spacing">
                    <div class="card-body">
                    <details>
                        <summary>
                            <span>${info.basic.name["first-name"]} ${info.basic.name["middle-name"]} ${info.basic.name["last-name"]}</span>
                            <div>${info.basic.sex} | ${info.basic.type} | ${info.basic.age ? info.basic.age : info.basic.subtype}</div>
                        </summary>
                        <hr>
                        ${awakenedAnimal(info)}

                        <div><span class="re-line-title">&nbsp;Height:&nbsp;</span> ${info.physical.height}</div>
                        <div><span class="re-line-title">&nbsp;Fat %:&nbsp;</span> ${info.physical.fat}</div>
                        <div><span class="re-line-title">&nbsp;Muscle %:&nbsp;</span> ${info.physical.muscle}</div>

                        <div><span class="re-line-title">&nbsp;Gender:&nbsp;</span> ${(100 - info.basic.gender)}% Feminine & ${info.basic.gender}% Masculine</div>
                        <div><span class="re-line-title">&nbsp;Orientation:&nbsp;</span> ${(100 - info.basic.orientation)}% Male & ${info.basic.orientation}% Female</div>

                        <div><span class="re-line-title">&nbsp;Ethics:&nbsp;</span> ${info.alignment.ethics}</div>
                        <div><span class="re-line-title">&nbsp;Morals:&nbsp;</span> ${info.alignment.morals}</div>

                        <div><span class="re-line-title">&nbsp;Wealth Score(1-100):&nbsp;</span> ${info.flavor.wealth}</div>
                        <div><span class="re-line-title">&nbsp;Profession:&nbsp;</span> ${info.flavor.profession}</div>
                        <div><span class="re-line-title">&nbsp;Trait:&nbsp;</span> ${info.flavor.trait}</div>
                        <div><span class="re-line-title">&nbsp;Interest:&nbsp;</span> ${info.flavor.interest}</div>
                        <div><span class="re-line-title">&nbsp;Quirk:&nbsp;</span> ${info.flavor.quirk}</div>
                        <div><span class="re-line-title">&nbsp;Fear:&nbsp;</span> ${info.flavor.fear}</div>
                        <div><span class="re-line-title">&nbsp;Items:&nbsp;</span> ${info.flavor.items}</div>

                        <div><span class="re-line-title">&nbsp;Magic item:&nbsp;</span> ${info.flavor["magic-item"]}</div>

                    </details>
                    </div>
                    <div class="card-footer">
                    <button class="re-thin-button" onclick=${()=>{deleteCharacter(i)}}>Delete</button>&nbsp;&nbsp;<button class="re-thin-button" onclick=${()=>{editCharacter(i)}}>Edit</button>
                    </div>
                </div>
            `)
        }`


}

function awakenedAnimal (data) {
    if (data.basic.type === "animal") {
        return html`
        <div><span class="re-line-title">&nbsp;Awakened:&nbsp;</span> ${data.basic.awakened ? "Yes" : "No"}</div>
        `
    }
    return ``
}

// function subType (data) {
//     let subTypeArr;
//     if (data.basic.type === "human") return ``;
//     if (data.basic.type === "animal") subTypeArr = animals;
//     if (data.basic.type === "monster") subTypeArr = monsters;
//     return html`
//     <div class="form-group">
//         <label for="subtype" class="form-label form-inline">Subtype:</label>
//         <select name="basic.subtype" class="form-select re-inline-form re-large-input">
//             ${
//             subTypeArr.map((subtype, i) => html`
//                 <option value=${subtype} selected="${data.basic.subtype === subtype}" >${subtype}</option>`)
//             }
//         </select>
//     </div>
//     `
// }