pragma solidity ^0.4.17;

import "contracts/Ballot.sol";

contract BallotCollection {
    address[] public ballots;

    function addBallot(string name, bytes32[] _proposals) public returns(address address_) {
        Ballot ballot = new Ballot(name, _proposals);
        ballot.setChairman(msg.sender);
        address_ = address(ballot);
        ballots.push(address_);
    }

    function getAllBallots() public view returns (address[] ballots_) {
        ballots_ = ballots;
    }
}