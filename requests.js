const axios = require("axios");
const _ = require("lodash");
const { ARMOR_TYPES } = require("./constants");

const fetchRandomArmorSet = armorType => {
  return axios
    .get(`https://mhw-db.com/armor`)
    .then(armorPieces => {
      const randomArmorSet = {};

      for (armorType of ARMOR_TYPES) {
        const randomArmorPiece = _.sample(
          armorPieces.data.filter(armorPiece => armorPiece.type === armorType)
        );
        _.merge(randomArmorSet, { [armorType]: randomArmorPiece });
      }

      return randomArmorSet;
    })
    .catch(error => {
      console.log(error);
    });
};

const fetchRandomWeapon = () => {
  return axios
    .get("https://mhw-db.com/weapons")
    .then(res => {
      const randomWeapon = _.sample(res.data);
      return randomWeapon;
    })
    .catch(error => {
      console.log(error);
    });
};

const fetchRandomCharm = () => {
  return axios
    .get("https://mhw-db.com/charms")
    .then(res => {
      const randomCharm = _.sample(res.data);
      return randomCharm;
    })
    .catch(error => {
      console.log(error);
    });
};

const fetchRandomMonster = () => {
  return axios
    .get('https://mhw-db.com/monsters?q={"type": "large"}')
    .then(res => {
      const randomMonster = _.sample(res.data);
      return randomMonster;
    })
    .catch(error => {
      console.log(error);
    });
};

exports.fetchRandomArmorSet = fetchRandomArmorSet;
exports.fetchRandomWeapon = fetchRandomWeapon;
exports.fetchRandomCharm = fetchRandomCharm;
exports.fetchRandomMonster = fetchRandomMonster;
