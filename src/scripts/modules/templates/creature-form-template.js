import { html, render } from 'lighterhtml';
import {animals} from '../data/animals';
import {monsters} from '../data/monsters';



function awakenedAnimal (data, awakeAnimal) {
    if (data.basic.type === "animal") {
        return html`
        <div class="form-group">
            <label for="awakened" class="form-switch">
                <input type="checkbox" name="awakened" name="awakened" id="awakened" checked="${data.basic.awakened}" onInput="${awakeAnimal}">
                <i class="form-icon"></i> Awakened
            </label>
        </div>
        `
    }
    return ``
}

function subType (data) {
    let subTypeArr;
    if (!data.basic.type || data.basic.type === "human") return ``;
    if (data.basic.type === "animal") subTypeArr = animals;
    if (data.basic.type === "monster") subTypeArr = monsters;
    return html`
    <div class="form-group">
        <label for="subtype" class="form-label form-inline">Subtype:</label>
        <select name="basic.subtype" class="form-select re-inline-form re-large-input">
            ${
            subTypeArr.map((subtype, i) => html`
                <option value=${subtype} selected="${data.basic.subtype === subtype}" >${subtype}</option>`)
            }
        </select>
    </div>
    `
}

export const creatureFormTemplate = function creatureFormTemplate (data, updateSliderFunct, awakeAnimalFunct) {
    let formData;
    if (data.isUpdating) {
        formData = data.updatingCreature;
    } else {
        formData = data.creatures[data.selectedCreatureType];
    }
    if (!formData) return;

    return html`
        <input class="form-input" style="display: none" type="text" name="basic.type" id="type" value=${formData.basic.type}>
        <input class="form-input" style="display: none" type="text" name="id" id="id" value=${formData.id}>

        ${awakenedAnimal(formData, awakeAnimalFunct)}

        ${subType(formData)}

        <div class="form-group">
            <label class="form-label form-inline" for="first-name">First Name:</label>
            <input class="form-input re-inline-form re-extra-large-input" type="text" name="basic.name.first-name" id="first-name" placeholder="First name" value=${formData.basic.name["first-name"]}>
        </div>

        <div class="form-group">
            <label class="form-label form-inline" for="middle-name">Middle Name:</label>
            <input class="form-input re-inline-form re-extra-large-input" type="text" name="basic.name.middle-name" id="middle-name" placeholder="Middle name" value=${formData.basic.name["middle-name"]}>
        </div>

        <div class="form-group">
            <label class="form-label form-inline" for="last-name">Last Name:</label>
            <input class="form-input re-inline-form re-extra-large-input" type="text" name="basic.name.last-name" id="last-name" placeholder="Last name" value=${formData.basic.name["last-name"]}>
        </div>

    <div class="form-group">
        <label class="form-label form-inline" for="age">Age:</label>
        <input class="form-input re-inline-form re-short-input" type="text" name="basic.age" id="age" placeholder="Age" value=${formData.basic.age}>
    </div>

    <div class="form-group">
        <label for="sex" class="form-label form-inline">Sex:</label>
        <select name="basic.sex" class="form-select re-inline-form re-large-input">
            ${
            ["female", "male","ambigious"].map((sex, i) => html`
                <option value=${sex} selected="${formData.basic.sex === sex}" >${sex}</option>`)
            }
        </select>
    </div>

    <div class="form-group">
        <label for="gender" class="form-label form-inline">Gender:</label>
        <input type="range" min="0" max="100" value="${formData.basic.gender}" data-slider-type="gender" class="re-slider gender-slider" name="basic.gender" id="gender" oninput="${(e)=>{updateSliderFunct(e, "gender", data.selectedCreatureType)}}">
        <div class="re-subtext gender-result">${html`${(100 - formData.basic.gender)}% Feminine & ${formData.basic.gender}% Masculine`}</div>
    </div>

    <div class="form-group">
        <label for="build" class="form-label form-inline">Orientation:</label>
        <input type="range" min="0" max="100" value="${formData.basic.orientation}" class="re-slider orientation-slider" name="basic.orientation" id="orientation" oninput="${(e)=>{updateSliderFunct(e, "orientation", data.selectedCreatureType)}}">
        <div class="re-subtext orientation-result">${html`${(100 - formData.basic.orientation)}% Male & ${formData.basic.orientation}% Female`}</div>
    </div>
    <div class="form-group">
        <label class="form-label form-inline" for="height">Height:</label>
        <input class="form-input re-inline-form re-short-input" type="text" name="physical.height" id="height" placeholder="Height" value=${formData.physical.height}>
    </div>

    <div class="form-group">
        <div>Body</div>
        <div>
            <label for="fat" class="form-label form-inline">Fat:</label>
            <input type="range" min="0" max="100" value="${formData.physical.fat}" class="re-slider fat-slider" name="physical.fat" id="fat" oninput="${(e)=>{updateSliderFunct(e, "fat", data.selectedCreatureType)}}">
            <span class="fat-result">${formData.physical.fat}%</span>
        </div>
        <div class="re-subtext">Male Average 14% / Female Average 18%</div>
        <div>
            <label for="muscle" class="form-label form-inline">Muscle:</label>
            <input type="range" min="0" max="100" value="${formData.physical.muscle}" class="re-slider muscle-slider" name="physical.muscle" id="muscle" oninput="${(e)=>{updateSliderFunct(e, "muscle", data.selectedCreatureType)}}">
            <span class="muscle-result">${formData.physical.muscle}%</span>
        </div>
        <div class="re-subtext">Male Average 31% / Female Average 20%</div>
    </div>

    <div class="form-group">
        <label class="form-label">Alignment: Ethics</label>
        ${
            ["lawful","neutral","chaotic"].map((ethic, i) => html`
            <label class="form-radio re-inline-form">
                <input type="radio" name="alignment.ethics.${ethic}" checked="${formData.alignment.ethics === ethic}">
                <i class="form-icon"></i> ${ethic.charAt(0).toUpperCase() + ethic.slice(1)}
            </label>
            `)
        }

        <label class="form-label">Alignment: Morals</label>
        ${
            ["good","neutral","evil"].map((moral, i) => html`
            <label class="form-radio re-inline-form">
                <input type="radio" name="alignment.morals.${moral}" checked="${formData.alignment.morals === moral}">
                <i class="form-icon"></i> ${moral.charAt(0).toUpperCase() + moral.slice(1)}
            </label>
            `)
        }
    </div>


    <div class="form-group">
        <label class="form-label form-inline" for="strength">Strength:</label>
        <input class="form-input re-inline-form re-short-input" type="text" name="stats.strength" id="strength" placeholder="Strength" value=${formData.stats.strength}>
    </div>
    <div class="form-group">
        <label class="form-label form-inline" for="dexterity">Dexterity:</label>
        <input class="form-input re-inline-form re-short-input" type="text" name="stats.dexterity" id="dexterity" placeholder="Dexterity" value=${formData.stats.dexterity}>
    </div>
    <div class="form-group">
        <label class="form-label form-inline" for="constitution">Constitution:</label>
        <input class="form-input re-inline-form re-short-input" type="text" name="stats.constitution" id="constitution" placeholder="Constitution" value=${formData.stats.constitution}>
    </div>
    <div class="form-group">
        <label class="form-label form-inline" for="wisdom">Wisdom:</label>
        <input class="form-input re-inline-form re-short-input" type="text" name="stats.wisdom" id="wisdom" placeholder="Wisdom" value=${formData.stats.wisdom}>
    </div>
    <div class="form-group">
        <label class="form-label form-inline" for="intelligence">intelligence:</label>
        <input class="form-input re-inline-form re-short-input" type="text" name="stats.intelligence" id="intelligence" placeholder="Intelligence" value=${formData.stats.intelligence}>
    </div>
    <div class="form-group">
        <label class="form-label form-inline" for="charisma">Charisma:</label>
        <input class="form-input re-inline-form re-short-input" type="text" name="stats.charisma" id="charisma" placeholder="Charisma" value=${formData.stats.charisma}>
    </div>

    <hr>

    <div class="form-group">
        <label class="form-label form-inline" for="wealth">Wealth Score (1-100):</label>
        <input class="form-input re-inline-form re-short-input" type="text" name="flavor.wealth" id="wealth" placeholder="Wealth" value=${formData.flavor.wealth}>
    </div>

    <div class="form-group">
        <label class="form-label form-inline" for="profession">Profession:</label>
        <input class="form-input re-inline-form re-extra-large-input" type="text" name="flavor.profession" id="profession" placeholder="Profession" value=${formData.flavor.profession}>
    </div>

    <div class="form-group">
        <label class="form-label form-inline" for="trait">Trait:</label>
        <input class="form-input re-inline-form re-extra-large-input" type="text" name="flavor.trait" id="trait" placeholder="Trait" value=${formData.flavor.trait}>
    </div>

    <div class="form-group">
        <label class="form-label form-inline" for="interest">Interest:</label>
        <input class="form-input re-inline-form re-extra-large-input" type="text" name="flavor.interest" id="interest" placeholder="Interest" value=${formData.flavor.interest}>
    </div>

    <div class="form-group">
        <label class="form-label form-inline" for="quirk">Quirk:</label>
        <input class="form-input re-inline-form re-extra-large-input" type="text" name="flavor.quirk" id="quirk" placeholder="Quirk" value=${formData.flavor.quirk}>
    </div>

    <div class="form-group">
        <label class="form-label form-inline" for="fear">Fear:</label>
        <input class="form-input re-inline-form re-extra-large-input" type="text" name="flavor.fear" id="fear" placeholder="Fear" value=${formData.flavor.fear}>
    </div>

    <div class="form-group">
        <label class="form-label form-inline" for="items">Items:</label>
        <input class="form-input re-inline-form re-extra-large-input" type="text" name="flavor.items" id="items" placeholder="Items" value=${formData.flavor.items}>
    </div>

    <div class="form-group">
        <label class="form-label form-inline" for="magic-item">Magic item:</label>
        <input class="form-input re-inline-form re-extra-large-input" type="text" name="flavor.magic-item" id="magic-item" placeholder="Magic item" value=${formData.flavor["magic-item"]}>
    </div>
    `
}