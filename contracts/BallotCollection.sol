pragma solidity ^0.4.17;

import "contracts/Ballot.sol";

contract BallotCollection {
    Ballot[] public ballots;

    mapping(string => bool) ballotNameHashRecords;

    function addBallot(string name) public {
        require(!ballotNameHashRecords[name], "the ballot already exists.");

        ballots.push(new Ballot(name));
        ballotNameHashRecords[name] = true;
    }
}