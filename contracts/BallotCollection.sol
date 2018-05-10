pragma solidity ^0.4.17;

import "contracts/Ballot.sol";

contract BallotCollection {
    address[] public ballots;

    function addBallot(string name) public {
        ballots.push(address(new Ballot(name)));
    }

    function getAllBallots() public view returns (address[] ballots_) {
        ballots_ = ballots;
    }
}