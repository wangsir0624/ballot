(function() {
    App = {
        web3Provider: null,

        contracts: {},

        initWeb3: function() {
            if (typeof web3 !== 'undefined') {
                this.web3Provider = web3.currentProvider;
            } else {
                this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            }
            web3 = new Web3(this.web3Provider);
        },

        initAdmin: function() {
            this.initWeb3();

            $.getJSON('../../build/contracts/BallotCollection.json', function(data) {
                App.contracts.BallotCollection = TruffleContract(data);
                App.contracts.BallotCollection.setProvider(App.web3Provider);

                App.contracts.BallotCollection.deployed().then(function(instance) {
                    return instance.ballots.call(0);
                }).then(function(result) {
                    console.log(result);
                }).catch(function(error) {
                    console.log(error.message);
                });
            });
        }
    };
})();