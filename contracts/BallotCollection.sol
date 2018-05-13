pragma solidity ^0.4.17;

import "contracts/Ballot.sol";

contract BallotCollection {
    address[] public ballots;

    function addBallot(string name, bytes32[] _proposals) public returns(address address_) {
        address_ = address(new Ballot(name, _proposals));
        ballots.push(address_);
    }

    function getAllBallots() public view returns (address[] ballots_) {
        ballots_ = ballots;
    }
}