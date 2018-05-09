pragma solidity ^0.4.17;

contract ThrowProxy {
  address public target;
  bytes data;

  constructor(address _target) {
    target = _target;
  }

  function() {
    data = msg.data;
  }

  function execute() returns (bool) {
    return target.call(data);
  }
}