pragma solidity ^0.4.17;

contract Ballot {
    string public name;

    address public chairman;

    struct Proposal {
        string name;
        uint voteCount;
    }

    Proposal[] public proposals;

    mapping(address => bool) voteRecords;

    constructor(string _name) public {
        name = _name;
        chairman = msg.sender;
    }

    function addProposal(string proposalName) public {
        proposals.push(Proposal({
            name: proposalName,
            voteCount: 0
        }));
    }

    function vote(uint proposal) public {
        require(!voteRecords[msg.sender], "Already voted.");
        voteRecords[msg.sender] = true;

        proposals[proposal].voteCount += 1;
    }

    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for(uint i = 0; i < proposals.length; i++) {
            if(proposals[i].voteCount >= winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winningProposal_ = i;
            }
        }
    }

    function winnerName() public view returns (string winnerName_) {
        return proposals[winningProposal()].name;
    }
}