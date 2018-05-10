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

        init: function(page = 'index') {
            this.initWeb3();

            $.getJSON('../build/contracts/BallotCollection.json', function(data) {
                App.contracts.BallotCollection = TruffleContract(data);
                App.contracts.BallotCollection.setProvider(App.web3Provider);

                if(page == 'index') {
                    App.contracts.BallotCollection.deployed().then(function (instance) {
                        collection = instance;

                        return collection.getAllBallots();
                    }).then(function (result) {
                        console.log(result);
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else if(page == 'addBallot') {

                }
            });
        },

        addBallotSubmit: function(form) {
            var ballotName = $(form).find("#inputName").val();
            var proposals = $(form).find("#inputProposals").val().split(" ").filter(function(proposal) {
                return proposal != "";
            });

            return false;
        }
    };
})();