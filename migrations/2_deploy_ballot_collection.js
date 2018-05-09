var BallotCollection = artifacts.require("./BallotCollection.sol");

module.exports = function(deployer) {
    deployer.deploy(BallotCollection);
};
