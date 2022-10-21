const MintNFT = artifacts.require("MintNFT");
const Market = artifacts.require("Market");

module.exports = function (deployer) {
  deployer.deploy(MintNFT);
  deployer.deploy(Market,1);
};
