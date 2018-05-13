(function() {
    App = {
        web3Provider: null,

        contracts: {},

        initWeb3: function() {
            if (typeof web3 !== 'undefined') {
                this.web3Provider = web3.currentProvider;
            } else {
                this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
            }
            web3 = new Web3(this.web3Provider);
        },

        initIndex: function() {
            this.initWeb3();

            $.getJSON('../build/contracts/BallotCollection.json', function(data) {
                App.contracts.BallotCollection = TruffleContract(data);
                App.contracts.BallotCollection.setProvider(App.web3Provider);

                App.contracts.BallotCollection.deployed().then(function (instance) {
                    collection = instance;

                    return collection.getAllBallots();
                }).then(function (result) {
                    $.getJSON('../build/contracts/Ballot.json', function(data) {
                        App.contracts.Ballot = TruffleContract(data);
                        App.contracts.Ballot.setProvider(App.web3Provider);
                        App.renderBallot(result, 0);
                    });
                }).catch(function (error) {
                    console.log(error);
                });
            });
        },

        initAddBallot: function() {
            this.initWeb3();

            $.getJSON('../build/contracts/BallotCollection.json', function(data) {
                App.contracts.BallotCollection = TruffleContract(data);
                App.contracts.BallotCollection.setProvider(App.web3Provider);
            });
        },

        addBallotSubmit: function(form) {
            var ballotName = $(form).find("#inputName").val();
            var proposals = $(form).find("#inputProposals").val().split(" ").filter(function(proposal) {
                return proposal != "";
            }).map(function(proposal) {
                return App.stringToBytes32(proposal);
            });
            
            App.contracts.BallotCollection.deployed().then(function(instance) {
                collection = instance;
                
                return collection.addBallot(ballotName, proposals);
            }).then(function(result) {
                console.log(result);
            }).catch(function(error) {
                console.log(error);
            });

            return false;
        },

        renderBallot: function(addresses, i) {
            if(i < addresses.length) {
                var ballotContract = App.contracts.Ballot.at(addresses[i]);
                ballotContract.info().then(function (result) {
                    var dom = '<tr>';
                    dom += '<td>' + result[0] + '</td>';
                    dom += '<td>' + result[1] + '</td>';
                    dom += '<td>' + App.byte32ToString(result[3]) + '</td>';
                    dom += '</tr>';
                    $(dom).appendTo("#ballot_tb tbody");

                    App.renderBallot(addresses, i+1);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },

        byte32ToString: function(raw) {
            var nums = [];
            for(var i = 2; i < 66; i += 2) {
                nums.push(parseInt(raw.substr(i, 2), 16));
            }
            console.log(this.stringToBytes32('中'));
            return this.toUTF8(nums);
        },

        toUTF8: function (bytes) {
            var utf8 = '';
            for (var i = 0; i < bytes.length; i++) {
                var binary = bytes[i].toString(2),
                    v = binary.match(/^1+?(?=0)/);

                if (v && binary.length == 8) {
                    var bytesLength = v[0].length;
                    var store = bytes[i].toString(2).slice(7 - bytesLength);
                    for (var st = 1; st < bytesLength; st++) {
                        store += bytes[st + i].toString(2).slice(2);
                    }
                    utf8 += String.fromCharCode(parseInt(store, 2));
                    i += bytesLength - 1;
                } else {
                    utf8 += String.fromCharCode(bytes[i]);
                }
            }

            return utf8;
        },

        stringToBytes32: function(raw) {
            var bytes = this.fromUTF8(raw);

            var bytes32 = '0x';
            for(var i in bytes) {
                bytes32 += bytes[i].toString(16);
            }

            while(bytes32.length < 66) {
                bytes32 += '0';
            }

            return bytes32;
        },

        fromUTF8: function (str, isGetBytes) {
            var back = [];
            var byteSize = 0;
            for (var i = 0; i < str.length; i++) {
                var code = str.charCodeAt(i);
                if (0x00 <= code && code <= 0x7f) {
                    byteSize += 1;
                    back.push(code);
                } else if (0x80 <= code && code <= 0x7ff) {
                    byteSize += 2;
                    back.push((192 | (31 & (code >> 6))));
                    back.push((128 | (63 & code)))
                } else if ((0x800 <= code && code <= 0xd7ff)
                    || (0xe000 <= code && code <= 0xffff)) {
                    byteSize += 3;
                    back.push((224 | (15 & (code >> 12))));
                    back.push((128 | (63 & (code >> 6))));
                    back.push((128 | (63 & code)))
                }
            }
            for (i = 0; i < back.length; i++) {
                back[i] &= 0xff;
            }
            if (isGetBytes) {
                return back
            }
            if (byteSize <= 0xff) {
                return [0, byteSize].concat(back);
            } else {
                return [byteSize >> 8, byteSize & 0xff].concat(back);
            }
        }
    };
})();