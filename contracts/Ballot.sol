pragma solidity ^0.4.17;

contract Ballot {
    string public name;

    address public chairman;

    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    Proposal[] public proposals;

    bytes32[] rawProposals;

    mapping(address => bool) voteRecords;

    bool public closed;

    constructor(string _name, bytes32[] _proposals) public {
        chairman = msg.sender;
        closed = false;
        name = _name;
        rawProposals = _proposals;
        for(uint i = 0; i < _proposals.length; i++) {
            proposals.push(Proposal({
                name: _proposals[i],
                voteCount: 0
            }));
        }
    }

    function vote(uint proposal) public {
        require(!closed, "the ballot is already closed.");
        require(!voteRecords[msg.sender], "Already voted.");
        voteRecords[msg.sender] = true;

        proposals[proposal].voteCount += 1;
    }

    function closeBallot() public {
        require(chairman == msg.sender, "only the chairman can close the ballot.");
        closed = true;
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

    function winnerName() public view returns (bytes32 winnerName_) {
        return proposals[winningProposal()].name;
    }

    function info() public view returns (string name_, address chairman_, bool closed_, bytes32 winner_, bytes32[] proposals_) {
        name_ = name;
        chairman_ = chairman;
        closed_ = closed;
        winner_ = winnerName();
        proposals_ = rawProposals;
    }
}