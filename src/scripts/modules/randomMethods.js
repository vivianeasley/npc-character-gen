import {professions} from './data/professions';
import {traits} from './data/traits';
import {interests} from './data/interests';
import {quirks} from './data/quirks';
import {fears} from './data/fears';
import {items} from './data/items';
import {magicItems} from './data/magic-items';

import {animals} from './data/animals';
import {monsters} from './data/monsters';

import {humanMaleFirstNamesArray} from "./data/human-male-first-names";
import {humanFemaleFirstNamesArray} from "./data/human-female-first-names";
import {humanNamesArray} from "./data/human-last-names";

import {monsterFirstNamesArray} from "./data/monster-first-names";
import {monsterNamesArray} from "./data/monster-last-names";

import {animalNames} from "./data/animal-names";
import {
  animalNamesPart1Array,
  animalNamesPart2Array,
  animalNamesPart3Array
} from "./data/animal-last-names";

const weightedExpBase10Arr = generatedWeightedExponentialArr(30);
const weighted30To40GaissBase100Arr = generatedWeightedGausianArr(30, 10, 16);
const weighted14To29GaissBase100Arr = generatedWeightedGausianArr(14, 15, 14);

export const getSubtype = function getSubtype (type) {
    if (type === "animal") return animals[(Math.floor(Math.random() * animals.length))]
    const randomeWeightValue = weightedExpBase10Arr[(Math.floor(Math.random() * weightedExpBase10Arr.length))];
    const increment = monsters.length/10;
    const randNum = getRandomInt(1, 11);
    const monsterIndex = (increment*(randomeWeightValue)-1) + randNum;
    return monsters[monsterIndex];
}

export const getFirstMiddleNames = function getFirstName (type, sex, isMiddle) {

    let creatureSex = sex;
    if (sex === "ambigious") {
      let randNum = Math.random();
      if (randNum < 0.5) {
        creatureSex = "female"
      } else {
        creatureSex = "male"
      }

    }

    if (type === "human") {
        if (creatureSex === "female") {
            return humanFemaleFirstNamesArray[(Math.floor(Math.random() * humanFemaleFirstNamesArray.length))]
        }
        if (creatureSex === "male") {
            return humanMaleFirstNamesArray[(Math.floor(Math.random() * humanMaleFirstNamesArray.length))]
        }
    }

    if (type === "monster") {
      return monsterFirstNamesArray[(Math.floor(Math.random() * monsterFirstNamesArray.length))]
    }

    if (isMiddle) {
      return "";
    }
    const animalName = animalNames[(Math.floor(Math.random() * animalNames.length))]
    return animalName.charAt(0).toUpperCase() + animalName.slice(1)
}

export const getLastNames = function getFirstName (type, isAwakended) {
    if (type === "animal") {
      const firstIndex = (Math.floor(Math.random() * animalNamesPart1Array.length));
      const secondIndex = (Math.floor(Math.random() * animalNamesPart2Array.length));
      const thirdIndex = (Math.floor(Math.random() * animalNamesPart3Array.length));
      return "The " + animalNamesPart1Array[firstIndex] + " " + animalNamesPart2Array[secondIndex] + " of " + animalNamesPart3Array[thirdIndex];
    }
    if (type === "human") return humanNamesArray[(Math.floor(Math.random() * humanNamesArray.length))];
    if (type === "monster") {
      return monsterNamesArray[(Math.floor(Math.random() * monsterNamesArray.length))] + " " + monsterNamesArray[(Math.floor(Math.random() * monsterNamesArray.length))];
    }
    return "";

}




export const getFatPercentage = function getFatPercentage () {
  const randomIndex = Math.floor(Math.random() * weighted14To29GaissBase100Arr.length);
  return weighted14To29GaissBase100Arr[randomIndex]
}

export const getMusclePercentage = function getMusclePercentage () {
  const randomIndex = Math.floor(Math.random() * weighted30To40GaissBase100Arr.length);
  return weighted30To40GaissBase100Arr[randomIndex]
}

export const getProfession = function getProfession (type) {
    if (type !== "animal") {
        return professions[type][(Math.floor(Math.random() * professions[type].length))]
    }
    return ""
}

export const getTrait = function getTrait (isAwakended) {
    if (!isAwakended) return "";
  return traits[(Math.floor(Math.random() * traits.length))]
}

export const getQuirk = function getQuirk (isAwakended) {
    if (!isAwakended) return "";
  return quirks[(Math.floor(Math.random() * quirks.length))]
}

export const getFear = function getFear (isAwakended) {
    if (!isAwakended) return "";
  return fears[(Math.floor(Math.random() * fears.length))]
}

export const getMagicItem = function getMagicItem () {
  const randNum = Math.random();
  if (randNum > .98) {
    return magicItems[(Math.floor(Math.random() * magicItems.length))]
  }
  return "No magic item";
}

export const getItems = function getItems (type) {
    if (type === "animal") return "";
  const numberOfItems = getRandomInt(1, 3);
  let itemsString = "";
  for (let index = 0; index < numberOfItems; index++) {
    itemsString = itemsString + items[(Math.floor(Math.random() * items.length))] + " / "
  }
  return itemsString.substring(0, itemsString.length-3)
}

export const getInterest = function getInterest (type, isAwakended) {
    if (!isAwakended) return "";
  return interests[type][(Math.floor(Math.random() * interests[type].length))]
}

export const getAge = function getAge (type) {
    if (type === "animal" || type === "monster") return "";
  const randNum = (randomGaussian(104, 3)) + 1;
  return randNum - (Math.floor(randNum * (Math.random() * (0.75 - 0) + 0)));
}

export const getWealth = function getWealth () {
  const randomIndex = Math.floor(Math.random() * weightedExpBase10Arr.length);
  return ((weightedExpBase10Arr[randomIndex] - 1) * 10) + (getRandomInt(0, 10));
}

export const getGender = function getGender (sex) {
    if (sex === "ambigious") return 50;
    const rand10Percent = (Math.random() > 0.95);
    const value = randomGaussian(51, 3);
    if (rand10Percent) {
        if (sex === "female") return value + 50;
        return value;
    }
    if (sex === "male") return value + 50;
    return value;
}

export const getOrientation = function getOrientation (sex) {
    let tmpSex = sex;
    if (sex === "ambigious") {
        tmpSex = Math.random() > 0.50 ? "Male" : "Female";
    };
    const rand10Percent = (Math.random() > 0.8);
    const value = randomGaussian(51, 3);
    if (rand10Percent) {
      if (tmpSex === "female") return value + 50;
      return value;
    }
    if (tmpSex === "male") return value + 50;
    return value;
  }


export const getSex = function getSex () {
  const randNum = Math.random();
  if (randNum < 0.48) return "female";
  if (randNum > 0.48 && randNum < 0.96) return "male";
  return "ambigious";
}

export const getRandomHash = function getRandomHash (length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// in inches
export const getHeight = function getHeight (sex, age, type) {
    if (type === "animal" || type === "monster") return "";
    let heightInInches = 0;
    const boyHeight = [29, 34, 37, 40, 43, 45, 48, 50, 52, 54, 56, 59, 61, 64, 67, 68];
    const girlHeight = [29, 33, 37, 39, 42, 45, 47, 50, 52, 54, 56, 59, 61, 62, 62, 64];
    if (age < 17 && sex === "male") heightInInches = boyHeight[age - 1];
    if (age < 17 && sex === "female") heightInInches = girlHeight[age - 1];
    if (age > 17) {
        const randNum = (randomGaussian(45, 8)) + 40;
        heightInInches = sex === "male" ? randNum + 4 : randNum;
    }

    const feet = Math.floor(heightInInches/12);
    const inches = heightInInches - (feet*12);
    return feet+"'"+inches+"\""
}

export const isAwakended = function isAwakended (type) {
    if (type !== "animal") return true;
    const randNum = Math.random();
    if (randNum < 0.05) return true;
    return false;
}

export const getEthics = function getEthics (type) {
  const moralRatios = {
    human: [0.45, 0.90],
    monster: [0.1, 0.35],
    animal: [0.1, 0.90],
  }
  const randNum = Math.random();
  if (randNum < moralRatios[type][0]) return "lawful";
  if (randNum >= moralRatios[type][0] &&
      randNum < moralRatios[type][1]) return "neutral";
  return "chaotic";
}

export const getMorals = function getMorals (type) {
  const moralRatios = {
    human: [0.45, 0.90],
    monster: [0.1, 0.35],
    animal: [0.1, 0.90],
  }
  const randNum = Math.random();
  if (randNum < moralRatios[type][0]) return "good";
  if (randNum >= moralRatios[type][0] &&
      randNum < moralRatios[type][1]) return "neutral";
  return "evil";
}

export const getStats = function getStats (isAwakended) {
  const SO = {};
  SO.strength = rollStat();
  SO.dexterity = rollStat();
  SO.constitution = rollStat();
  if (isAwakended) {
    SO.wisdom = rollStat();
    SO.intelligence = rollStat();
    SO.charisma = rollStat();
  } else {
    SO.wisdom = "";
    SO.intelligence = "";
    SO.charisma = "";
  }


  return SO;

  function rollStat () {
    const total = (getRandomInt(1, 6)) + (getRandomInt(1, 6)) + (getRandomInt(1, 6));
    return total;
  }
}

// rarity 1 = no distrabution. rarity > 6 = crazy rare to ever see min or max values
function randomGaussian (max, rarity) {
  let total = 0;
  for (let i = 0; i < rarity; i++) {
    total += (getRandomInt(0, max));
  }

  return Math.round(total/rarity)

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max+1);
  return Math.floor(Math.random() * (max - min) + min);
}

function generatedWeightedGausianArr (peakStart, peakRange, max) {
  const tmp = [];
  let amount = 1;
  let arraySize = 1;
  for (let index = 1; index < 101; index++) {
    if (arraySize < 1) arraySize = 1;
    for (let j = 0; j < arraySize; j++) {
      tmp.push(Math.floor(amount))
    }
    if (index > peakStart - max) {
      if (index < peakStart) {
        arraySize = arraySize + 1;
      } else if (index > (peakStart + peakRange)) {
        arraySize = arraySize - 1;
      }
    }
    amount++;
  }

  return tmp;
}

function generatedWeightedExponentialArr (weightedTowardsValue) {
  const tmp = [];
  let amount = 1;
  let arraySize = 47;
  for (let index = 1; index < 101; index++) {
    if (arraySize < 1) arraySize = 1;
    for (let j = 0; j < arraySize; j++) {
      tmp.push(Math.floor(amount))
    }
    arraySize = arraySize - index;
    if (arraySize < 0) break
    amount++;
  }
  return tmp
}