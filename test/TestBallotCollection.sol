pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BallotCollection.sol";
import "test/ThrowProxy.sol";

contract TestBallotCollection {
    BallotCollection collection = BallotCollection(DeployedAddresses.BallotCollection());

    Ballot ballot;

    function testAddBallot() public {
        collection.addBallot("ballot1");
        collection.addBallot("ballot2");
        ballot = collection.ballots(0);
    }

    function testAddBallotAlreadyExists() public {
        ThrowProxy proxy = new ThrowProxy(address(collection));
        BallotCollection(address(proxy)).addBallot("ballot1");
        bool r = proxy.execute();

        Assert.isFalse(r, "Should throw when add ballot with the same name.");
    }

    function testAddProposal() public {
        ballot.addProposal("zhang san");
        ballot.addProposal("li si");
        ballot.addProposal("wang wu");
    }

    function testVote() public {
        ballot.vote(1);
    }

    function testVoteAlready() public {
        ThrowProxy proxy = new ThrowProxy(address(ballot));
        Ballot(address(proxy)).vote(1);
        bool r = proxy.execute();

        Assert.isFalse(r, "Should throw when a single person vote twice.");
    }

    function testWinningProposal() public {
        Assert.equal(ballot.winningProposal(), 1, "The winning proposal should be 1.");
    }

    function testWinnerName() public {
        Assert.equal(ballot.winnerName(), "li si", "The winner should by li si.");
    }
}