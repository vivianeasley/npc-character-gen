import * as randomMethods from "./modules/randomMethods";
import formJson from 'form-json';
import {mainLayout} from "./modules/templates/main-layout"
import {store} from "./modules/local-storage"

window.onload = function() {
  checkAccess();
  async function checkAccess () {
    // await store.setItem('npcs', []);
    const savedNpcs = await store.getItem('npcs');
    if (savedNpcs) {
      init(savedNpcs);
    } else {
      init([])
    }

  }
};

async function init (data) {
  const uiData = {
    isUpdating: false,
    updatingCreature: {},
    isModalOpen: false,
    creatures: {},
    selectedCreatureType: "human",
    sliders: {
      gender: 50,
    }
  };


  const mainNode = document.querySelector("main");
  mainLayout(mainNode, data, uiData, saveNpc, closeModal, removeNpc, editNpc, tabSelect, sliderUpdate, awakeAnimal)

  const form = document.querySelector(".creator-form")
  let creatures = {};
  creatures.human = getCreatureFormObj("human");
  creatures.monster = getCreatureFormObj("monster");
  creatures.animal = getCreatureFormObj("animal");

  const openModalButtonNode = document.querySelector(".open-character-modal");

  openModalButtonNode.addEventListener("click", ()=>{
    uiData.creatures.human = getCreatureFormObj("human");
    uiData.creatures.monster = getCreatureFormObj("monster");
    uiData.creatures.animal = getCreatureFormObj("animal");
    populateForm("human", uiData.creatures);
    populateForm("monster", uiData.creatures);
    populateForm("animal", uiData.creatures);
    uiData.isModalOpen = true;
    mainLayout(mainNode, data, uiData, saveNpc, closeModal, removeNpc, editNpc, tabSelect, sliderUpdate, awakeAnimal)
  }, false);

  async function saveData (creaturesData) {
    await store.setItem("npcs", creaturesData);
  }

  function removeNpc (npcIndex) {
    const result = window.confirm("Are you sure you wish to delete " + name + "? This cannot be undone.");
    if (!result) return;
    data.splice(npcIndex, 1);
    saveData(data);
    mainLayout(mainNode, data, uiData, saveNpc, closeModal, removeNpc, editNpc, tabSelect, sliderUpdate, awakeAnimal)
  }

  function editNpc (npcIndex) {
    uiData.isUpdating = true;
    uiData.updatingCreature = data[npcIndex];
    uiData.isModalOpen = true;
    mainLayout(mainNode, data, uiData, saveNpc, closeModal, removeNpc, editNpc, tabSelect, sliderUpdate, awakeAnimal)
  }

  function closeModal () {
    uiData.isUpdating = false;
    uiData.updatingCreature = {};
    uiData.isModalOpen = false;
    mainLayout(mainNode, data, uiData, saveNpc, closeModal, removeNpc, editNpc, tabSelect, sliderUpdate, awakeAnimal)
  }

  function tabSelect (selectedTabType) {
    uiData.selectedCreatureType = selectedTabType;
    mainLayout(mainNode, data, uiData, saveNpc, closeModal, removeNpc, editNpc, tabSelect, sliderUpdate, awakeAnimal)
  }

  function saveNpc () {
    const creatureFormData = formJson(form);
    const npcData = fixAligmentData(creatureFormData);
    let updateNpcIndex;
    for (let r = 0; r < data.length; r++) {
      if (data[r].id === npcData.id) {
        updateNpcIndex = r;
        break;
      }
    }

    if (updateNpcIndex !== undefined) {
      data.splice(updateNpcIndex, 1, npcData);
    } else {
      "chouldn't have done this"
      data.push(npcData);
    }

    saveData(data);
    uiData.isModalOpen = false;
    uiData.isUpdating = false;
    uiData.updatingCreature = {};
    mainLayout(mainNode, data, uiData, saveNpc, closeModal, removeNpc, editNpc, tabSelect, sliderUpdate, awakeAnimal)
  }

  function sliderUpdate (e, sliderType, creatureType) {
    if (!sliderType || !creatureType) return;
    if (sliderType === "fat" || sliderType === "muscle") {
      uiData.creatures[creatureType].physical[sliderType] = e.target.value;
    } else {
      uiData.creatures[creatureType].basic[sliderType] = e.target.value;
    }
    mainLayout(mainNode, data, uiData, saveNpc, closeModal, removeNpc, editNpc, tabSelect, sliderUpdate, awakeAnimal)
  }

  function awakeAnimal () {
    const creatureFormData = formJson(form);
    const npcData = fixAligmentData(creatureFormData);
    uiData.creatures.animal = npcData;
    uiData.creatures.animal.awakened = true;
    populateForm("animal", uiData.creatures);
    mainLayout(mainNode, data, uiData, saveNpc, closeModal, removeNpc, editNpc, tabSelect, sliderUpdate, awakeAnimal)

  }
}

function populateForm (npcType, creatures) {
  const sex = randomMethods.getSex();
  const type = npcType || "human"; // changes for each one
  const age = randomMethods.getAge(type);
  const formObj = creatures[type];
  const isAwakended = check(formObj.awakened, ()=>{return randomMethods.isAwakended(type)});
  const creatureId = "c" + (randomMethods.getRandomHash(8));

  formObj.id = check(formObj.id, ()=>{return creatureId});
  formObj.basic.type = check(formObj.basic.type, ()=>{return type});
  formObj.basic.subtype = check(formObj.basic.subtype, ()=>{return randomMethods.getSubtype(type)});
  formObj.basic.awakened = check(formObj.basic.awakened, ()=>{return isAwakended});
  formObj.basic.age = check(formObj.basic.age, ()=>{return age});
  formObj.basic.name["first-name"] = check(formObj.basic.name["first-name"], ()=>{return randomMethods.getFirstMiddleNames(type, sex, false)});
  formObj.basic.name["middle-name"] = check(formObj.basic.name["middle-name"], ()=>{return randomMethods.getFirstMiddleNames(type, sex, true)});
  formObj.basic.name["last-name"] = check(formObj.basic.name["last-name"], ()=>{return randomMethods.getLastNames(type, false)});
  formObj.basic.sex = check(formObj.basic.sex, ()=>{return sex});
  formObj.basic.gender = check(formObj.basic.gender, ()=>{return randomMethods.getGender(sex)});
  formObj.basic.orientation = check(formObj.basic.orientation, ()=>{return randomMethods.getOrientation(sex)});
  formObj.physical.height = check(formObj.physical.height, ()=>{return randomMethods.getHeight(sex, age, type)});
  formObj.physical.fat = check(formObj.physical.fat, ()=>{return randomMethods.getFatPercentage()});
  formObj.physical.muscle = check(formObj.physical.muscle, ()=>{return randomMethods.getMusclePercentage()});
  formObj.alignment.ethics = check(formObj.alignment.ethics, ()=>{return randomMethods.getEthics(type)});
  formObj.alignment.morals = check(formObj.alignment.morals, ()=>{return randomMethods.getMorals(type)});
  formObj.stats = check(formObj.stats, ()=>{return randomMethods.getStats(isAwakended)});
  formObj.flavor.wealth = check(formObj.flavor.wealth, ()=>{return randomMethods.getWealth()});
  formObj.flavor.profession = check(formObj.flavor.profession, ()=>{return randomMethods.getProfession(type)});
  formObj.flavor.trait = check(formObj.flavor.trait, ()=>{return randomMethods.getTrait(isAwakended)});
  formObj.flavor.interest = check(formObj.flavor.interest, ()=>{return randomMethods.getInterest(type, isAwakended)});
  formObj.flavor.quirk = check(formObj.flavor.quirk, ()=>{return randomMethods.getQuirk(isAwakended)});
  formObj.flavor.fear = check(formObj.flavor.fear, ()=>{return randomMethods.getFear(isAwakended)});
  formObj.flavor.items = check(formObj.flavor.items, ()=>{return randomMethods.getItems(type)});
  formObj.flavor["magic-item"] = check(formObj.flavor["magic-item"], ()=>{return randomMethods.getMagicItem()});

  function check (value, callback) {
    if (typeof value === "object") {
      const keysArr = Object.keys(value);
      if (keysArr.length === 6)  {
        const result = callback();
        return result;
      }
      if (keysArr.length > 0) {
        value = keysArr[0];
      }
      if (keysArr.length === 0) value = "";
    }
    if (!value || value === "") {
      const result = callback();
      return result;
    };
    return value;
  }

}

function fixAligmentData (data) {
  const ethicsKeys = Object.keys(data.alignment.ethics);
  const moralsKeys = Object.keys(data.alignment.morals);
  data.alignment.ethics = ethicsKeys[0];
  data.alignment.morals = moralsKeys[0];
  return data;
}

function getCreatureFormObj (type) {
  const formObj = {
      "id": undefined,
      "basic":{
        "name":{
            "first-name":undefined,
            "middle-name":undefined,
            "last-name":undefined
        },
        "type": undefined,
        "age":undefined,
        "sex":undefined,
        "subtype":undefined,
        "gender":undefined,
        "orientation":undefined
      },
      "awakened":undefined,
      "physical":{
        "height":undefined,
        "fat":undefined,
        "muscle":undefined
      },
      "alignment":{
        "ethics":undefined,
        "morals":undefined
      },
      "stats":{
        "strength":undefined,
        "dexterity":undefined,
        "constitution":undefined,
        "wisdom":undefined,
        "intelligence":undefined,
        "charisma":undefined
      },
      "flavor":{
        "wealth":undefined,
        "profession":undefined,
        "trait":undefined,
        "interest":undefined,
        "quirk":undefined,
        "fear":undefined,
        "items":undefined,
        "magic-item":undefined
      }
  }

  return formObj;
}